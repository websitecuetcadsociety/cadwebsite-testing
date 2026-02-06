import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sanityClient } from '@/lib/sanity';
import { Megaphone, X, ChevronRight } from 'lucide-react';
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
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (!isVisible || announcements.length === 0) return null;

  const current = announcements[currentIndex];
  
  const typeColors = {
    info: 'from-primary/90 to-primary',
    event: 'from-accent/90 to-accent',
    workshop: 'from-emerald-500/90 to-emerald-600',
    urgent: 'from-red-500/90 to-red-600',
  };

  const bgGradient = typeColors[current.type || 'info'];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`relative bg-gradient-to-r ${bgGradient} text-primary-foreground overflow-hidden`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 py-2.5 sm:py-3">
            <Megaphone className="w-4 h-4 flex-shrink-0 animate-pulse" />
            
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-xs sm:text-sm truncate">
                {current.title}:
              </span>
              <span className="text-xs sm:text-sm text-primary-foreground/90 truncate hidden sm:inline">
                {current.message}
              </span>
            </div>

            {current.link && (
              <Link 
                to={current.link}
                className="flex items-center gap-1 text-xs font-medium hover:underline flex-shrink-0"
              >
                Learn more
                <ChevronRight className="w-3 h-3" />
              </Link>
            )}

            {announcements.length > 1 && (
              <div className="hidden sm:flex items-center gap-1 ml-2">
                {announcements.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      idx === currentIndex 
                        ? 'bg-primary-foreground' 
                        : 'bg-primary-foreground/40 hover:bg-primary-foreground/60'
                    }`}
                  />
                ))}
              </div>
            )}

            <button
              onClick={() => setIsVisible(false)}
              className="ml-2 p-1 rounded-full hover:bg-primary-foreground/20 transition-colors flex-shrink-0"
              aria-label="Close announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
