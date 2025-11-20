import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FloatingContact from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import profileData from "@/data/profile.json";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingContact />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                Visual Artist & Painter
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Where Emotion
              <br />
              <span className="text-primary">Takes Form</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Vibrant works blending realism and expressive abstraction
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => navigate("/gallery")}
                className="group"
              >
                Explore Gallery
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/about")}
              >
                About the Artist
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="/Mona_Resume.pdf" download target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-border/50">
              <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="text-4xl font-bold text-primary mb-2">{profileData.profile.projects}</div>
                <div className="text-sm text-muted-foreground">Artworks</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Years Creating</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="text-4xl font-bold text-primary mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Inspiration</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Meet <span className="text-primary">MSketch</span>
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-center mb-12 animate-fade-in-up">
              <p className="text-foreground/90 leading-relaxed text-lg">
                {profileData.profile.about.split("\n\n")[0]}
              </p>
            </div>

            <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-center p-6 rounded-lg bg-background border border-border/50 max-w-sm w-full">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Inspiration</h3>
                <p className="text-sm text-muted-foreground">
                  Nature's rhythm, human stories, imagination
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Explore?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Discover a collection of soulful portraits, serene landscapes, and impactful conceptual pieces
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/gallery")}
              className="group"
            >
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
