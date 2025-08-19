import HeroSection from "@/components/HeroSection";
import QuoteSection from "@/components/QuoteSection";
import AIResearchAreas from "@/components/AIResearchAreas";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0 grid-bg opacity-5"></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-48 h-48 bg-pink-500/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/4 w-56 h-56 bg-blue-500/8 rounded-full blur-2xl"></div>
      </div>

      {/* Content with relative positioning to appear above background */}
      <div className="relative z-10">
        <HeroSection />
        <main id="main-content">
          <QuoteSection />
          <AIResearchAreas />
          <TechStack />
        </main>
      </div>
    </div>
  );
}