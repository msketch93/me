import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import FloatingContact from "@/components/FloatingContact";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import profileData from "@/data/profile.json";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const headerAnimation = useScrollAnimation();
  const searchAnimation = useScrollAnimation({ delay: 100 });

  // Extract all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    profileData.projects.forEach((project) => {
      project.tools.forEach((tool) => tags.add(tool));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter projects based on search and selected tags
  const filteredProjects = useMemo(() => {
    return profileData.projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tools.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingContact />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div ref={headerAnimation.ref} className={`text-center mb-12 transition-all duration-700 ${headerAnimation.animationClass}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Gallery</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore {profileData.projects.length} works of art, each telling its own unique story
            </p>
          </div>

          {/* Search and Filter */}
          <div ref={searchAnimation.ref} className={`mb-8 space-y-6 transition-all duration-700 ${searchAnimation.animationClass}`}>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTag(tag)}
                  className="capitalize"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project, index) => {
                const { ref, animationClass } = useScrollAnimation({ delay: index * 50 });
                return (
                  <div key={project.id} ref={ref} className={`transition-all duration-700 ${animationClass}`}>
                    <ProjectCard project={project} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No artworks found matching your criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Gallery;
