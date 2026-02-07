import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sanityClient, Activity, urlFor } from '@/lib/sanity';
import { Calendar, MapPin, Sparkles, Trophy, Users, GraduationCap, Compass, Star } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 10;

const categoryConfig: Record<string, { label: string; icon: typeof Trophy; color: string }> = {
  competition: { label: 'Competition', icon: Trophy, color: 'bg-amber-500/10 text-amber-500 border-amber-500/30' },
  seminar: { label: 'Seminar', icon: GraduationCap, color: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
  training: { label: 'Training', icon: Users, color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
  social: { label: 'Social', icon: Sparkles, color: 'bg-pink-500/10 text-pink-500 border-pink-500/30' },
  'field-trip': { label: 'Field Trip', icon: Compass, color: 'bg-purple-500/10 text-purple-500 border-purple-500/30' },
  other: { label: 'Activity', icon: Star, color: 'bg-primary/10 text-primary border-primary/30' },
};

interface ExtendedActivity extends Activity {
  category?: string;
  venue?: string;
  highlights?: string[];
  gallery?: any[];
}

const Activities = () => {
  const [activities, setActivities] = useState<ExtendedActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        if (!projectId || projectId === 'your-project-id-here') {
          setLoading(false);
          return;
        }

        const data = await sanityClient.fetch<ExtendedActivity[]>(
          '*[_type == "activity"] | order(date desc)'
        );
        setActivities(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredActivities = selectedCategory
    ? activities.filter((a) => a.category === selectedCategory)
    : activities;

  const categories = [...new Set(activities.map((a) => a.category).filter(Boolean))];

  // Pagination logic
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="h-12 bg-muted/50 rounded w-64 mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/3] bg-muted/30 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Our Journey
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Club <span className="text-primary">Activities</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Explore our past events, competitions, seminars, and memorable moments that shape our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      {categories.length > 0 && (
        <section className="py-6 border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                }`}
              >
                All Activities
              </button>
              {categories.map((cat) => {
                const config = categoryConfig[cat || 'other'];
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat || null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    {config?.label || cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Activities Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {paginatedActivities.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedActivities.map((activity, index) => {
                  const config = categoryConfig[activity.category || 'other'];
                  const CategoryIcon = config?.icon || Sparkles;

                  return (
                    <motion.div
                      key={activity._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="group h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all overflow-hidden">
                        {activity.image && (
                          <div className="aspect-video relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent z-10" />
                            <img
                              src={urlFor(activity.image)}
                              alt={activity.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 z-20">
                              <Badge
                                variant="outline"
                                className={`${config?.color || 'bg-primary/10 text-primary'} text-xs font-medium flex items-center gap-1`}
                              >
                                <CategoryIcon className="w-3 h-3" />
                                {config?.label || 'Activity'}
                              </Badge>
                            </div>
                            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 text-xs text-white/90">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(activity.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                        )}
                        <CardContent className="p-5">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 text-lg">
                            {activity.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                            {activity.description}
                          </p>
                          {activity.venue && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5" />
                              {activity.venue}
                            </div>
                          )}
                          {activity.highlights && activity.highlights.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-border/50">
                              <p className="text-xs font-medium text-foreground mb-2">Highlights:</p>
                              <ul className="space-y-1">
                                {activity.highlights.slice(0, 2).map((highlight, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                    <Star className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No activities found</p>
              <p className="text-sm mt-1">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Activities;
