import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Event, urlFor } from '@/lib/sanity';
import { Calendar, MapPin, Clock, ExternalLink, FileText, Tag, CheckCircle, XCircle } from 'lucide-react';
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Event Image */}
        {event.image && (
          <div className="aspect-video w-full overflow-hidden rounded-lg -mt-2 mb-4">
            <img 
              src={urlFor(event.image)} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <DialogHeader>
          <div className="space-y-3">
            <DialogTitle className="text-2xl md:text-3xl text-foreground font-bold">
              {event.title}
            </DialogTitle>
            <div className="flex gap-2 flex-wrap items-start">
              {event.eventType && (
                <Badge variant="secondary" className="flex items-center gap-1 text-xs px-2 py-1 whitespace-nowrap">
                  <Tag size={10} />
                  {event.eventType}
                </Badge>
              )}
              {event.registrationOpen ? (
                <Badge className="bg-primary flex items-center gap-1 text-xs px-2 py-1 whitespace-nowrap">
                  <CheckCircle size={10} />
                  Open
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1 text-xs px-2 py-1 text-muted-foreground whitespace-nowrap">
                  <XCircle size={10} />
                  Closed
                </Badge>
              )}
              {isPastEvent && (
                <Badge variant="outline" className="text-xs px-2 py-1 text-muted-foreground whitespace-nowrap">Past</Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-4" />
        
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">About This Event</h3>
            <DialogDescription className="text-foreground leading-relaxed text-base">
              {event.description}
            </DialogDescription>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date & Time Card */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">Date & Time</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar size={18} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">
                      {eventDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                {event.time && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Clock size={18} className="text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{event.time}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Venue Card */}
            {event.venue && (
              <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">Venue</h4>
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{event.venue}</span>
                </div>
              </div>
            )}
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
              <Button className="w-full text-lg py-6">
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
