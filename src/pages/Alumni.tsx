import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sanityClient, Alumni, urlFor } from '@/lib/sanity';
import { Linkedin, Briefcase, Facebook, Mail } from 'lucide-react';

const AlumniPage = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        
        if (!projectId || projectId === 'your-project-id-here') {
          console.warn('⚠️ Sanity not configured. Please add your Sanity project credentials to .env file.');
          console.info('📖 See QUICKSTART.md for setup instructions.');
          return;
        }

        const data = await sanityClient.fetch('*[_type == "alumni"] | order(batch desc)');
        setAlumni(data);
      } catch (error) {
        console.error('❌ Sanity fetch error:', error);
        console.info('💡 Make sure you have created the "alumni" schema in Sanity Studio.');
        console.info('📖 See SANITY_SETUP.md for schema definitions.');
      }
    };

    fetchAlumni();
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-foreground mb-4">Our Alumni</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating the success of our former members across the globe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alumni.map((alum, index) => (
            <motion.div
              key={alum._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-xl hover:shadow-primary/10 transition-all group">
                <CardContent className="p-6 space-y-4">
                  {alum.image ? (
                    <img 
                      src={urlFor(alum.image)} 
                      alt={alum.name}
                      className="w-32 h-32 mx-auto rounded-full object-cover ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all"
                    />
                  ) : (
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-3xl font-bold">
                      {alum.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{alum.name}</h3>
                    <div className="flex justify-center gap-2 flex-wrap">
                      <Badge variant="secondary">
                        Batch {alum.batch}
                      </Badge>
                      {alum.passingYear && (
                        <Badge variant="outline">
                          Passed {alum.passingYear}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Work Area & Position */}
                  <div className="pt-4 border-t border-border space-y-3">
                    {alum.workArea && (
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Work Area</p>
                        <p className="text-sm font-medium text-foreground">{alum.workArea}</p>
                      </div>
                    )}
                    {alum.currentPosition && (
                      <div className="flex items-start space-x-2">
                        <Briefcase size={16} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{alum.currentPosition}</p>
                          {alum.company && (
                            <p className="text-sm text-muted-foreground">{alum.company}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-2 pt-2">
                    {alum.email && (
                      <a
                        href={`mailto:${alum.email}`}
                        className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        title="Email"
                      >
                        <Mail size={18} />
                      </a>
                    )}
                    {alum.linkedin && (
                      <a
                        href={alum.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {alum.facebook && (
                      <a
                        href={alum.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        title="Facebook"
                      >
                        <Facebook size={18} />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniPage;
