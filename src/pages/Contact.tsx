import Navigation from "@/components/Navigation";
import FloatingContact from "@/components/FloatingContact";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Instagram, Linkedin, Share2, MessageCircle } from "lucide-react";
import profileData from "@/data/profile.json";

const Contact = () => {
  const socialIcons = {
    "Linked In": { icon: Linkedin, color: "text-blue-600" },
    Behance: { icon: Share2, color: "text-blue-500" },
    Instagram: { icon: Instagram, color: "text-pink-600" },
    Whatsapp: { icon: MessageCircle, color: "text-green-600" },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingContact />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Get In Touch</h1>
            <p className="text-muted-foreground text-lg">
              Let's collaborate on bringing your artistic vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6 animate-fade-in-up">
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-muted-foreground text-sm">
                          {profileData.profile.lg_address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a
                          href={`tel:${profileData.profile.phone}`}
                          className="text-muted-foreground text-sm hover:text-primary transition-colors"
                        >
                          {profileData.profile.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href={`mailto:${profileData.profile.email}`}
                          className="text-muted-foreground text-sm hover:text-primary transition-colors break-all"
                        >
                          {profileData.profile.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Media */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-lg">Connect on Social Media</h3>
                  <div className="space-y-3">
                    {profileData.profile.social_accounts.map((social) => {
                      const { icon: Icon, color } = socialIcons[
                        social.name as keyof typeof socialIcons
                      ] || { icon: Share2, color: "text-primary" };
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-3 hover:bg-primary/10 hover:border-primary/50"
                          >
                            <Icon className={`h-5 w-5 ${color}`} />
                            <span>{social.name}</span>
                          </Button>
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Artist Profile</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {profileData.profile.nickName} ({profileData.profile.name})
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">{profileData.profile.projects}</span>
                    <span>Published Artworks</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
