import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sanityClient, Workshop, urlFor } from '@/lib/sanity';
import { Calendar, User } from 'lucide-react';
import WorkshopDetailDialog from '@/components/WorkshopDetailDialog';

const Workshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        
        if (!projectId || projectId === 'your-project-id-here') {
          console.warn('⚠️ Sanity not configured. Please add your Sanity project credentials to .env file.');
          console.info('📖 See QUICKSTART.md for setup instructions.');
          return;
        }

        const data = await sanityClient.fetch('*[_type == "workshop"] | order(date desc)');
        setWorkshops(data);
      } catch (error) {
        console.error('❌ Sanity fetch error:', error);
        console.info('💡 Make sure you have created the "workshop" schema in Sanity Studio.');
        console.info('📖 See SANITY_SETUP.md for schema definitions.');
      }
    };

    fetchWorkshops();
  }, []);

  const handleCardClick = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-foreground mb-4">Workshops</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hands-on training sessions designed to enhance your CAD skills
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="group overflow-hidden cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                onClick={() => handleCardClick(workshop)}
              >
                {/* Instagram-style square image */}
                <div className="aspect-square w-full overflow-hidden relative">
                  {workshop.image ? (
                    <img 
                      src={urlFor(workshop.image)} 
                      alt={workshop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <User size={48} className="text-muted-foreground/50" />
                    </div>
                  )}
                  {/* Overlay badge */}
                  {workshop.duration && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs">
                        {workshop.duration}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Card content */}
                <CardContent className="p-4 space-y-3">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {workshop.title}
                  </CardTitle>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">{workshop.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      <span>{new Date(workshop.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    {workshop.instructor && (
                      <div className="flex items-center gap-1.5 truncate">
                        <User size={14} className="text-primary flex-shrink-0" />
                        <span className="truncate">{workshop.instructor}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <WorkshopDetailDialog 
        workshop={selectedWorkshop}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Workshops;
