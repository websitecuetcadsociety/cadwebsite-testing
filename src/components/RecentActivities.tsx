import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sanityClient, Event, Workshop, Activity, urlFor } from '@/lib/sanity';
import { Calendar, ChevronRight, BookOpen, CalendarDays, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CombinedActivity {
  _id: string;
  title: string;
  description: string;
  date: string;
  image?: any;
  type: 'event' | 'workshop' | 'activity';
  link: string;
}

const RecentActivities = () => {
  const [combinedActivities, setCombinedActivities] = useState<CombinedActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        
        if (!projectId || projectId === 'your-project-id-here') {
          setLoading(false);
          return;
        }

        // Fetch events, workshops, and activities in parallel
        const [events, workshops, activities] = await Promise.all([
          sanityClient.fetch<Event[]>('*[_type == "event"] | order(date desc)[0...4]'),
          sanityClient.fetch<Workshop[]>('*[_type == "workshop"] | order(date desc)[0...4]'),
          sanityClient.fetch<Activity[]>('*[_type == "activity"] | order(date desc)[0...4]'),
        ]);

        // Transform and combine all data
        const combined: CombinedActivity[] = [
          ...events.map((e) => ({
            _id: e._id,
            title: e.title,
            description: e.description,
            date: e.date,
            image: e.image,
            type: 'event' as const,
            link: '/events',
          })),
          ...workshops.map((w) => ({
            _id: w._id,
            title: w.title,
            description: w.description,
            date: w.date,
            image: w.image,
            type: 'workshop' as const,
            link: '/workshop',
          })),
          ...activities.map((a) => ({
            _id: a._id,
            title: a.title,
            description: a.description,
            date: a.date,
            image: a.image,
            type: 'activity' as const,
            link: '/events',
          })),
        ];

        // Sort by date descending and take top 4
        combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setCombinedActivities(combined.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setLoading(false);
      }
    };

    fetchAllActivities();
  }, []);

  const typeConfig = {
    event: { 
      label: 'Event', 
      icon: CalendarDays, 
      color: 'bg-primary/10 text-primary border-primary/30' 
    },
    workshop: { 
      label: 'Workshop', 
      icon: BookOpen, 
      color: 'bg-accent/10 text-accent border-accent/30' 
    },
    activity: { 
      label: 'Activity', 
      icon: Sparkles, 
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' 
    },
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-secondary/20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="h-10 bg-muted/50 rounded w-64 mx-auto mb-3 animate-pulse" />
            <div className="h-5 bg-muted/30 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video bg-muted/30 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-secondary/20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Recent <span className="text-primary">Activities</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Stay updated with our latest events and workshops
            </p>
          </div>
          <Link to="/events" className="hidden sm:block">
            <Button variant="ghost" className="text-primary hover:text-primary/80 group">
              View All
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {combinedActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {combinedActivities.map((activity, index) => {
              const config = typeConfig[activity.type];
              const TypeIcon = config.icon;
              
              return (
                <Link key={activity._id} to={activity.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group cursor-pointer bg-card/50 border-border/50 hover:border-primary/30 transition-all overflow-hidden">
                      {activity.image && (
                        <div className="aspect-video relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent z-10" />
                          <img 
                            src={urlFor(activity.image)} 
                            alt={activity.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={`${config.color} text-xs font-medium flex items-center gap-1`}
                            >
                              <TypeIcon className="w-3 h-3" />
                              {config.label}
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 left-3 z-20">
                            <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded">
                              {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      )}
                      <CardContent className="p-4 sm:p-5">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 text-sm sm:text-base">
                          {activity.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                          {activity.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recent activities to display</p>
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link to="/events">
            <Button className="w-full">View All Events</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentActivities;
