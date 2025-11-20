import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProjectDialog from "./ProjectDialog";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    image: string[];
    tools: string[];
    description?: string;
    behance_link?: string;
    instagram_link?: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Extract Google Drive file ID from various URL formats
  const getGoogleDriveImageUrl = (url: string) => {
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
      /\/d\/([a-zA-Z0-9_-]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
      }
    }
    return url;
  };

  const imageUrl = getGoogleDriveImageUrl(project.image[0]);

  return (
    <>
      <Card 
        className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 animate-fade-in-up cursor-pointer"
        onClick={() => setDialogOpen(true)}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {!imageError ? (
          <img
            src={imageUrl}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">{project.name}</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-foreground font-semibold mb-2 text-lg">{project.name}</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.slice(0, 3).map((tool) => (
                <Badge key={tool} variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      </Card>
      
      <ProjectDialog 
        project={project} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </>
  );
};

export default ProjectCard;
