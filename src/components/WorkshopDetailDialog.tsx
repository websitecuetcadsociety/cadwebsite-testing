import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Workshop, urlFor } from '@/lib/sanity';
import { Calendar, Clock, User } from 'lucide-react';

interface WorkshopDetailDialogProps {
  workshop: Workshop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorkshopDetailDialog = ({ workshop, open, onOpenChange }: WorkshopDetailDialogProps) => {
  if (!workshop) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {workshop.image && (
          <div className="aspect-video w-full overflow-hidden rounded-lg -mt-2 mb-4">
            <img 
              src={urlFor(workshop.image)} 
              alt={workshop.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <DialogHeader>
          <div className="space-y-2">
            <DialogTitle className="text-2xl text-foreground">
              {workshop.title}
            </DialogTitle>
            {workshop.duration && (
              <Badge variant="secondary">{workshop.duration}</Badge>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{workshop.description}</p>
          
          <div className="space-y-3 p-4 rounded-lg bg-muted/50 border border-border">
            {workshop.instructor && (
              <div className="flex items-center space-x-3 text-sm">
                <User size={18} className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Instructor:</span>
                <span className="text-foreground font-medium">{workshop.instructor}</span>
              </div>
            )}
            <div className="flex items-center space-x-3 text-sm">
              <Calendar size={18} className="text-primary flex-shrink-0" />
              <span className="text-muted-foreground">Date:</span>
              <span className="text-foreground font-medium">
                {new Date(workshop.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            {workshop.duration && (
              <div className="flex items-center space-x-3 text-sm">
                <Clock size={18} className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Duration:</span>
                <span className="text-foreground font-medium">{workshop.duration}</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkshopDetailDialog;
