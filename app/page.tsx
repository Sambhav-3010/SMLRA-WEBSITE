import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import EventSection from "@/components/EventSection";
import QuoteSection from "@/components/QuoteSection";
import AIResearchAreas from "@/components/AIResearchAreas";
import TechStack from "@/components/TechStack";
import InteractiveNeuralNetwork from "@/components/InteractiveNeuralNetwork";

export default function Home() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  return (
    <>
      <HeroSection isMobile={isMobile} />
      <main id="main-content">
        <QuoteSection />
        <AIResearchAreas />
        {/* Uncomment the section below to enable the interactive neural network demo */}
        {/* <section className="py-20 bg-slate-900/30" aria-labelledby="neural-network-demo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2 id="neural-network-demo" className="text-3xl sm:text-4xl font-bold font-display mb-4">
                <span className="text-gradient">Interactive</span> Neural Network
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Watch how information flows through our deep learning models in real-time
              </p>
            </header>
            <InteractiveNeuralNetwork />
          </div>
        </section> */}
        <EventSection />
        <TechStack />
        <FeaturedSection />
      </main>
    </>
  );
}
