import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-border">
        {/* Hero Image - Facebook Cover Ratio */}
        <div className="aspect-[820/312] w-full overflow-hidden relative">
          {workshop.image ? (
            <img 
              src={urlFor(workshop.image)} 
              alt={workshop.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-background to-secondary/30 flex items-center justify-center">
              <GraduationCap size={64} className="text-muted-foreground/30" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Status badges on image */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-lg">
              <GraduationCap size={12} className="mr-1" />
              Workshop
            </Badge>
            {isPastWorkshop && (
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm border-muted-foreground/30">
                Completed
              </Badge>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Header */}
          <DialogHeader className="space-y-3">
            <div className="flex items-start gap-3 flex-wrap">
              {workshop.duration && (
                <Badge variant="outline">{workshop.duration}</Badge>
              )}
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {workshop.title}
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
                  {workshopDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Duration Card */}
            {workshop.duration && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Clock size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Duration</p>
                  <p className="text-sm font-semibold text-foreground">{workshop.duration}</p>
                </div>
              </div>
            )}

            {/* Instructor Card */}
            {workshop.instructor && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Instructor</p>
                  <p className="text-sm font-semibold text-foreground">{workshop.instructor}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">About This Workshop</h3>
            <DialogDescription className="text-foreground/90 leading-relaxed text-base">
              {workshop.description}
            </DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkshopDetailDialog;
