import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Workshop, urlFor } from '@/lib/sanity';
import { Calendar, Clock, User, GraduationCap } from 'lucide-react';

interface WorkshopDetailDialogProps {
  workshop: Workshop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorkshopDetailDialog = ({ workshop, open, onOpenChange }: WorkshopDetailDialogProps) => {
  if (!workshop) return null;

  const workshopDate = new Date(workshop.date);
  const isPastWorkshop = workshopDate < new Date();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Workshop Image */}
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
          <div className="space-y-3">
            <DialogTitle className="text-2xl md:text-3xl text-foreground font-bold">
              {workshop.title}
            </DialogTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="flex items-center gap-1">
                <GraduationCap size={12} />
                Workshop
              </Badge>
              {workshop.duration && (
                <Badge variant="outline">{workshop.duration}</Badge>
              )}
              {isPastWorkshop && (
                <Badge variant="outline" className="text-muted-foreground">Completed</Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-4" />
        
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">About This Workshop</h3>
            <DialogDescription className="text-foreground leading-relaxed text-base">
              {workshop.description}
            </DialogDescription>
          </div>

          {/* Workshop Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date & Duration Card */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">Schedule</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar size={18} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">
                      {workshopDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                {workshop.duration && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Clock size={18} className="text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">Duration: {workshop.duration}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Instructor Card */}
            {workshop.instructor && (
              <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">Instructor</h4>
                <div className="flex items-center space-x-3 text-sm">
                  <User size={18} className="text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{workshop.instructor}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkshopDetailDialog;
