import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Instagram } from "lucide-react";

interface ProjectDialogProps {
  project: {
    id: number;
    name: string;
    image: string[];
    tools: string[];
    description?: string;
    behance_link?: string;
    instagram_link?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDialog = ({ project, open, onOpenChange }: ProjectDialogProps) => {
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

  const getGoogleDriveImageUrl = (url: string) => {
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
      /\/d\/([a-zA-Z0-9_-]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`;
      }
    }
    return url;
  };

  const hasMultipleImages = project.image.length > 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image Carousel */}
          {hasMultipleImages ? (
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {project.image.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                      {!imageError[index] ? (
                        <img
                          src={getGoogleDriveImageUrl(img)}
                          alt={`${project.name} - Image ${index + 1}`}
                          className="w-full h-full object-contain"
                          onError={() => setImageError({ ...imageError, [index]: true })}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <p>Image unavailable</p>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          ) : (
            <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
              {!imageError[0] ? (
                <img
                  src={getGoogleDriveImageUrl(project.image[0])}
                  alt={project.name}
                  className="w-full h-full object-contain"
                  onError={() => setImageError({ ...imageError, 0: true })}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <p>Image unavailable</p>
                </div>
              )}
            </div>
          )}

          {/* Social Links */}
          {(project.behance_link || project.instagram_link) && (
            <div className="flex gap-3">
              {project.behance_link && (
                <Button variant="outline" asChild className="flex-1">
                  <a href={project.behance_link} target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                    View on Behance
                  </a>
                </Button>
              )}
              {project.instagram_link && (
                <Button variant="outline" asChild className="flex-1">
                  <a href={project.instagram_link} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5 mr-2" />
                    View on Instagram
                  </a>
                </Button>
              )}
            </div>
          )}

          {/* Description if available */}
          {project.description && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Description</h3>
              <p className="text-foreground">{project.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
