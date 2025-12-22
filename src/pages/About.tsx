import Navigation from "@/components/Navigation";
import FloatingContact from "@/components/FloatingContact";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";
import profileData from "@/data/profile.json";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingContact />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About MSketch</h1>
            <p className="text-primary text-xl">{profileData.profile.name}</p>
          </div>

          {/* About Section */}
          <div className="mb-16 animate-fade-in-up">
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  {profileData.profile.about.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-foreground/90 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education Section */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            <div className="space-y-4">
              {profileData.education.map((edu, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {edu.name}
                        </h3>
                        <p className="text-primary mb-2">{edu.todo}</p>
                        <p className="text-muted-foreground text-sm">{edu.date}</p>
                      </div>
                      {edu.main && (
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Work Experience</h2>
            </div>
            <div className="space-y-4">
              {profileData.work.map((job, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {job.position}
                        </h3>
                        <p className="text-primary mb-2">{job.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {job.location} • {job.date}
                        </p>
                      </div>
                      <span>
                        {job.main && (
                          <span className="px-3 py-1 my-1 bg-primary/20 text-primary text-xs rounded-full">
                            Current
                          </span>
                        )}
                        <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                          {job.role}
                        </span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
