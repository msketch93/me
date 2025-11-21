import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Mail,
  MessageCircle,
  MessageCircleMore,
  Share2,
  Twitter,
} from "lucide-react";
import profileData from "@/data/profile.json";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : `${import.meta.env.BASE_URL}`;
  const shareDescription = `Discover ${profileData.profile.nickName} (${profileData.profile.name}) - a passionate visual artist transforming emotion, nature, and imagination into vibrant art.`;

  const shareTargets = useMemo(() => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedDescription = encodeURIComponent(shareDescription);
    const combinedMessage = `${shareDescription} ${shareUrl}`;
    const encodedMessage = encodeURIComponent(combinedMessage);
    const emailSubject = encodeURIComponent(`${profileData.profile.nickName} | Visual Artist Portfolio`);
    const emailBody = encodeURIComponent(`${shareDescription}\n\n${shareUrl}`);

    return [
      {
        label: "Facebook",
        helper: "Share as a Facebook post",
        icon: Facebook,
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedDescription}`,
      },
      {
        label: "X",
        helper: "Post on X (Twitter)",
        icon: Twitter,
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedDescription}`,
      },
      {
        label: "WhatsApp",
        helper: "Send via WhatsApp",
        icon: MessageCircle,
        href: `https://wa.me/?text=${encodedMessage}`,
      },
      {
        label: "Messenger",
        helper: "Send in Messenger",
        icon: MessageCircleMore,
        href: `https://www.messenger.com/t/?link=${encodedUrl}&text=${encodedDescription}`,
      },
      {
        label: "Email",
        helper: "Share in an email",
        icon: Mail,
        href: `mailto:?subject=${emailSubject}&body=${emailBody}`,
      },
    ];
  }, [shareDescription, shareUrl]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-card border border-border rounded-lg shadow-xl p-4 min-w-[240px] animate-scale-in space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Share MSKETCH</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{shareDescription}</p>
          </div>
          <div className="flex flex-col gap-2">
            {shareTargets.map((target) => {
              const Icon = target.icon;
              return (
                <Button
                  key={target.label}
                  variant="ghost"
                  asChild
                  className="justify-start gap-3 text-sm text-foreground/80 hover:text-primary"
                >
                  <a href={target.href} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-5 w-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="font-medium">{target.label}</span>
                      <span className="text-xs text-muted-foreground">{target.helper}</span>
                    </div>
                  </a>
                </Button>
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
