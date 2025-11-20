import { useState } from "react";
import { Share2, Phone, Mail, Instagram, MessageCircle, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileData from "@/data/profile.json";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialIcons = {
    "Linked In": Linkedin,
    Behance: Share2,
    Instagram: Instagram,
    Whatsapp: MessageCircle,
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-card border border-border rounded-lg shadow-xl p-4 min-w-[200px] animate-scale-in">
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${profileData.profile.phone}`}
              className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="text-sm">Call</span>
            </a>
            <a
              href={`mailto:${profileData.profile.email}`}
              className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="text-sm">Email</span>
            </a>
            {profileData.profile.social_accounts.map((social) => {
              const Icon = socialIcons[social.name as keyof typeof socialIcons];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Share2 className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default FloatingContact;
