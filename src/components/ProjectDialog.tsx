import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
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
    behance_url?: string;
    instagram_url?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BehanceIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 7h-7V5h7v2zm1.733 10.021c-.452 1.315-2.088 3.164-5.253 3.164-3.1 0-5.62-1.739-5.62-5.84s2.33-6.025 5.5-6.025c3.108 0 5.018 1.828 5.433 4.532.08.507.11 1.192.096 2.147h-8.122c.132 3.293 3.524 3.395 4.65 2.079h3.316zM16 12h5.021c-.106-1.578-1.154-2.263-2.512-2.263-1.485 0-2.306.783-2.509 2.263zM6.043 20H-.5V5H6.535c5.557.08 5.662 5.594 2.759 7.098 3.514 1.295 3.631 8.167-3.251 8.167zM2 11h3.641c2.552 0 2.956-3.041-.318-3.041H2V11zm3.46 3H2v3.058h3.41c3.096 0 2.905-3.058.05-3.058z" />
  </svg>
);

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
  const socialLinks = useMemo(() => {
    const links = [];
    if (project.behance_url) {
      links.push({
        label: "Behance",
        href: project.behance_url,
        icon: <BehanceIcon />,
      });
    }
    if (project.instagram_url) {
      links.push({
        label: "Instagram",
        href: project.instagram_url,
        icon: <Instagram className="h-5 w-5" />,
      });
    }
    return links;
  }, [project.behance_url, project.instagram_url]);

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
                dragFree: true,
                containScroll: "trimSnaps",
                breakpoints: {
                  "(max-width: 768px)": { dragFree: true },
                },
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="cursor-grab touch-pan-y active:cursor-grabbing">
                {project.image.map((img, index) => (
                  <CarouselItem key={index} className="transition-all duration-500 ease-out">
                    <div className="relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden border border-border/50 shadow-lg">
                      {!imageError[index] ? (
                        <img
                          src={getGoogleDriveImageUrl(img)}
                          alt={`${project.name} - Image ${index + 1}`}
                          className="w-full h-full object-contain transition-transform duration-700 ease-out hover:scale-[1.01]"
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
            <div className="relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden border border-border/50 shadow-lg">
              {!imageError[0] ? (
                <img
                  src={getGoogleDriveImageUrl(project.image[0])}
                  alt={project.name}
                  className="w-full h-full object-contain transition-transform duration-700 ease-out"
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
          {socialLinks.length > 0 && (
            <div className="flex flex-col gap-3 sm:flex-row">
              {socialLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="secondary"
                  asChild
                  className="flex-1 justify-center gap-2 text-base"
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                    <span>View on {link.label}</span>
                  </a>
                </Button>
              ))}
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
