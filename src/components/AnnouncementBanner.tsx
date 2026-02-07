import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sanityClient } from '@/lib/sanity';
import { Megaphone, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Announcement {
  _id: string;
  title: string;
  message: string;
  link?: string;
  type?: 'info' | 'event' | 'workshop' | 'urgent';
}

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        if (!projectId || projectId === 'your-project-id-here') return;

        const data = await sanityClient.fetch(
          '*[_type == "announcement" && isActive == true] | order(_createdAt desc)[0...5]'
        );
        setAnnouncements(data);
      } catch (error) {
        console.error('Announcement fetch error:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Auto-rotate announcements
  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  if (!isVisible || announcements.length === 0) return null;

  const current = announcements[currentIndex];
  
  const typeStyles = {
    info: {
      bg: 'bg-primary',
      icon: 'bg-primary-foreground/20',
    },
    event: {
      bg: 'bg-accent',
      icon: 'bg-primary-foreground/20',
    },
    workshop: {
      bg: 'bg-emerald-600',
      icon: 'bg-primary-foreground/20',
    },
    urgent: {
      bg: 'bg-red-600',
      icon: 'bg-primary-foreground/20',
    },
  };

  const style = typeStyles[current.type || 'info'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`relative ${style.bg} text-primary-foreground overflow-hidden`}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-start sm:items-center gap-3 py-3 sm:py-2.5">
            {/* Icon */}
            <div className={`flex-shrink-0 p-1.5 rounded-full ${style.icon} mt-0.5 sm:mt-0`}>
              <Megaphone className="w-3.5 h-3.5" />
            </div>
            
            {/* Content - stacked on mobile, inline on desktop */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-2"
                >
                  {/* Title */}
                  <span className="font-semibold text-sm block sm:inline">
                    {current.title}
                  </span>
                  
                  {/* Separator - desktop only */}
                  <span className="hidden sm:inline text-primary-foreground/60">•</span>
                  
                  {/* Message - full text visible */}
                  <p className="text-xs sm:text-sm text-primary-foreground/90 leading-relaxed">
                    {current.message}
                  </p>
                  
                  {/* Link */}
                  {current.link && (
                    <Link 
                      to={current.link}
                      className="inline-flex items-center gap-1 text-xs font-medium bg-primary-foreground/20 hover:bg-primary-foreground/30 px-2 py-0.5 rounded-full transition-colors mt-1.5 sm:mt-0 sm:ml-2"
                    >
                      Learn more
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation & Close - right side */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Navigation arrows - only if multiple announcements */}
              {announcements.length > 1 && (
                <div className="flex items-center gap-0.5 mr-1">
                  <button
                    onClick={goToPrev}
                    className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
                    aria-label="Previous announcement"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-primary-foreground/70 min-w-[28px] text-center">
                    {currentIndex + 1}/{announcements.length}
                  </span>
                  <button
                    onClick={goToNext}
                    className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
                    aria-label="Next announcement"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
                aria-label="Close announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
