import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sanityClient, Event, urlFor } from '@/lib/sanity';
import { Calendar, MapPin } from 'lucide-react';
import EventDetailDialog from '@/components/EventDetailDialog';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        
        if (!projectId || projectId === 'your-project-id-here') {
          console.warn('⚠️ Sanity not configured. Please add your Sanity project credentials to .env file.');
          console.info('📖 See QUICKSTART.md for setup instructions.');
          return;
        }

        const data = await sanityClient.fetch('*[_type == "event"] | order(date desc)');
        setEvents(data);
      } catch (error) {
        console.error('❌ Sanity fetch error:', error);
        console.info('💡 Make sure you have created the "event" schema in Sanity Studio.');
        console.info('📖 See SANITY_SETUP.md for schema definitions.');
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (event: Event) => {
    setSelectedEvent(event);
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
          <h1 className="text-5xl font-bold text-foreground mb-4">Upcoming Events</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us for exciting CAD workshops, competitions, and seminars
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="group overflow-hidden cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                onClick={() => handleCardClick(event)}
              >
                {/* Facebook cover style image */}
                <div className="aspect-[820/312] w-full overflow-hidden relative">
                  {event.image ? (
                    <img 
                      src={urlFor(event.image)} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Calendar size={48} className="text-muted-foreground/50" />
                    </div>
                  )}
                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    {event.eventType && (
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs">
                        {event.eventType}
                      </Badge>
                    )}
                    {event.registrationOpen && (
                      <Badge className="bg-primary text-primary-foreground text-xs">Open</Badge>
                    )}
                  </div>
                </div>

                {/* Card content */}
                <CardContent className="p-4 space-y-3">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                  </CardTitle>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin size={14} className="text-primary flex-shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <EventDetailDialog 
        event={selectedEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Events;
