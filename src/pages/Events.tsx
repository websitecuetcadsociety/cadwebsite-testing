import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sanityClient, Event, urlFor } from '@/lib/sanity';
import { Calendar, MapPin, Clock, ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl hover:shadow-primary/10 transition-all group overflow-hidden">
                {event.image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={urlFor(event.image)} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors mb-2">
                        {event.title}
                      </CardTitle>
                      {event.eventType && (
                        <Badge variant="secondary" className="mb-2">{event.eventType}</Badge>
                      )}
                    </div>
                    {event.registrationOpen && (
                      <Badge className="bg-primary">Open</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar size={16} className="text-primary flex-shrink-0" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock size={16} className="text-primary flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.venue && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin size={16} className="text-primary flex-shrink-0" />
                        <span>{event.venue}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    {event.rulebook && (
                      <Button variant="outline" className="flex-1" asChild>
                        <a href={event.rulebook} target="_blank" rel="noopener noreferrer">
                          <FileText size={16} className="mr-2" />
                          Rulebook
                        </a>
                      </Button>
                    )}
                    {event.eventLink && (
                      <Button variant="outline" className="flex-1" asChild>
                        <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Event Link
                        </a>
                      </Button>
                    )}
                  </div>

                  {event.registrationOpen && (
                    <Link to="/register">
                      <Button className="w-full">
                        Register Now
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
