import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event, urlFor } from '@/lib/sanity';
import { Calendar, MapPin, Clock, ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventDetailDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventDetailDialog = ({ event, open, onOpenChange }: EventDetailDialogProps) => {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <DialogTitle className="text-2xl text-foreground mb-2">
                {event.title}
              </DialogTitle>
              <div className="flex gap-2 flex-wrap">
                {event.eventType && (
                  <Badge variant="secondary">{event.eventType}</Badge>
                )}
                {event.registrationOpen && (
                  <Badge className="bg-primary">Registration Open</Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          
          <div className="space-y-3 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center space-x-3 text-sm">
              <Calendar size={18} className="text-primary flex-shrink-0" />
              <span className="text-foreground font-medium">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            {event.time && (
              <div className="flex items-center space-x-3 text-sm">
                <Clock size={18} className="text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{event.time}</span>
              </div>
            )}
            {event.venue && (
              <div className="flex items-center space-x-3 text-sm">
                <MapPin size={18} className="text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{event.venue}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
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
            <Link to="/register" onClick={() => onOpenChange(false)}>
              <Button className="w-full">
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
