import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event, urlFor } from '@/lib/sanity';
import { Calendar, MapPin, Clock, ExternalLink, FileText, Tag, CheckCircle, XCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventDetailDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventDetailDialog = ({ event, open, onOpenChange }: EventDetailDialogProps) => {
  if (!event) return null;

  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-border">
        {/* Hero Image - Facebook Cover Ratio */}
        <div className="aspect-[820/312] w-full overflow-hidden relative">
          {event.image ? (
            <img 
              src={urlFor(event.image)} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-background to-secondary/30 flex items-center justify-center">
              <Users size={64} className="text-muted-foreground/30" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Status badges on image */}
          <div className="absolute top-4 right-4 flex gap-2">
            {event.registrationOpen ? (
              <Badge className="bg-primary text-primary-foreground shadow-lg">
                <CheckCircle size={12} className="mr-1" />
                Registration Open
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                <XCircle size={12} className="mr-1" />
                Registration Closed
              </Badge>
            )}
            {isPastEvent && (
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm border-muted-foreground/30">
                Past Event
              </Badge>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Header */}
          <DialogHeader className="space-y-3">
            <div className="flex items-start gap-3 flex-wrap">
              {event.eventType && (
                <Badge variant="secondary" className="flex items-center gap-1.5">
                  <Tag size={12} />
                  {event.eventType}
                </Badge>
              )}
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {event.title}
            </DialogTitle>
          </DialogHeader>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Date Card */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Calendar size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
                <p className="text-sm font-semibold text-foreground">
                  {eventDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Time Card */}
            {event.time && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Clock size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Time</p>
                  <p className="text-sm font-semibold text-foreground">{event.time}</p>
                </div>
              </div>
            )}

            {/* Venue Card */}
            {event.venue && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Venue</p>
                  <p className="text-sm font-semibold text-foreground">{event.venue}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">About This Event</h3>
            <DialogDescription className="text-foreground/90 leading-relaxed text-base">
              {event.description}
            </DialogDescription>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {event.rulebook && (
              <Button variant="outline" className="flex-1" asChild>
                <a href={event.rulebook} target="_blank" rel="noopener noreferrer">
                  <FileText size={16} className="mr-2" />
                  View Rulebook
                </a>
              </Button>
            )}
            {event.eventLink && (
              <Button variant="outline" className="flex-1" asChild>
                <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  Event Details
                </a>
              </Button>
            )}
          </div>

          {/* Registration Button */}
          {event.registrationOpen && !isPastEvent && (
            <Link to="/register" onClick={() => onOpenChange(false)} className="block">
              <Button className="w-full text-lg py-6 font-semibold">
                Register Now
              </Button>
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDialog;
