import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="h-full hover:shadow-xl hover:shadow-primary/10 transition-all group overflow-hidden cursor-pointer"
                onClick={() => handleCardClick(workshop)}
              >
                {workshop.image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={urlFor(workshop.image)} 
                      alt={workshop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">{workshop.title}</CardTitle>
                    {workshop.duration && (
                      <Badge variant="secondary">{workshop.duration}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed line-clamp-2">{workshop.description}</p>
                  
                  <div className="space-y-2 pt-4 border-t border-border">
                    {workshop.instructor && (
                      <div className="flex items-center space-x-2 text-sm">
                        <User size={16} className="text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">Instructor:</span>
                        <span className="text-foreground font-medium">{workshop.instructor}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar size={16} className="text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Date:</span>
                      <span className="text-foreground font-medium">
                        {new Date(workshop.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-primary font-medium pt-2">Click for details →</p>
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
