"use client";

import { useState, Suspense, lazy, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Lazy load heavy components
const FacultyCard = lazy(() => import("@/components/FacultyCard"));
const PastCouncilCard = lazy(() => import("@/components/CouncilMembers"));

type PastCouncilMember = {
  name: string;
  role: string;
  imageUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
};

type PastCouncilYear = {
  year: string;
  members: PastCouncilMember[];
};

type PastCouncilsProps = {
  pastCouncils: PastCouncilYear[];
};

type FacultyMember = {
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl: string;
  facultyProfileUrl: string;
  email: string;
};

// Loading skeletons
const FacultyCardSkeleton = () => (
  <div className="bg-slate-800/50 rounded-xl p-6 animate-pulse">
    <div className="flex items-center space-x-4">
      <div className="w-20 h-20 bg-slate-700 rounded-full"></div>
      <div className="flex-1">
        <div className="h-6 bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const PastCouncilCardSkeleton = () => (
  <div className="bg-slate-800/50 rounded-xl p-4 animate-pulse">
    <div className="w-20 h-20 bg-slate-700 rounded-full mx-auto mb-4"></div>
    <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto mb-2"></div>
    <div className="h-3 bg-slate-700 rounded w-1/2 mx-auto"></div>
  </div>
);

const FacultySection = ({ faculty }: { faculty: { members: FacultyMember[] }[] }) => (
  <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl text-center sm:text-5xl lg:text-6xl font-bold mb-10">
        Our <span className="text-gradient">Faculty</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <Suspense
          fallback={
            <>
              <FacultyCardSkeleton />
              <FacultyCardSkeleton />
            </>
          }
        >
          {faculty[0].members.map((member, index) => (
            <FacultyCard
              key={member.name}
              name={member.name}
              role={member.role}
              imageUrl={member.imageUrl}
              linkedinUrl={member.linkedinUrl}
              facultyProfileUrl={member.facultyProfileUrl}
              email={member.email}
              index={index}
            />
          ))}
        </Suspense>
      </div>
    </div>
  </section>
);

const CurrentTeamSection = () => (
  <section className="py-16">
    <h1 className="text-4xl text-center md:text-5xl font-bold text-white mb-6 mt-32">
      <span className="text-gradient">Current</span> Council
    </h1>
    <p className="text-slate-300 text-lg text-center md:text-xl max-w-3xl mx-auto mb-32">
      Meet the dedicated students leading SMLRA this year and driving our mission forward.
    </p>
  </section>
);

const PastCouncilsLoading = () => (
  <div className="space-y-10">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="border border-slate-700 rounded-2xl overflow-hidden bg-slate-900/30 animate-pulse"
      >
        <div className="px-6 sm:px-8 py-6 flex items-center justify-between">
          <div className="h-8 bg-slate-700 rounded w-32"></div>
          <div className="h-6 w-6 bg-slate-700 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const PastCouncilsContent = ({ pastCouncils }: PastCouncilsProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());

  const toggleSection = (year: string) => {
    setExpandedSection((prev) => (prev === year ? null : year));
    // Mark section as loaded when first expanded
    if (!loadedSections.has(year)) {
      setLoadedSections(prev => new Set(prev).add(year));
    }
  };

  const isExpanded = (year: string) => expandedSection === year;

  return (
    <div className="space-y-10">
      {pastCouncils.map((council, councilIndex) => (
        <motion.div
          key={councilIndex}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: councilIndex * 0.1 }}
          viewport={{ once: true, margin: "100px" }}
          className="border border-slate-700 rounded-2xl overflow-hidden bg-slate-900/30"
        >
          {/* Clickable header */}
          <button
            onClick={() => toggleSection(council.year)}
            className="w-full px-6 sm:px-8 py-6 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors duration-300"
            aria-expanded={isExpanded(council.year)}
            aria-controls={`council-${council.year}`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {council.year}
            </h2>
            <motion.div
              animate={{ rotate: isExpanded(council.year) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-6 w-6 text-purple-400" />
            </motion.div>
          </button>

          {/* Collapsible content */}
          <AnimatePresence>
            {isExpanded(council.year) && (
              <motion.div
                id={`council-${council.year}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 sm:px-8 pb-8">
                  {/* Only render content when section is expanded and loaded */}
                  {loadedSections.has(council.year) ? (
                    <Suspense
                      fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                          {[...Array(Math.min(8, council.members.length))].map((_, index) => (
                            <PastCouncilCardSkeleton key={index} />
                          ))}
                        </div>
                      }
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {council.members.map((member, memberIndex) => (
                          <PastCouncilCard
                            key={`${council.year}-${member.name}`}
                            name={member.name}
                            role={member.role}
                            imageUrl={member.imageUrl}
                            githubUrl={member.githubUrl}
                            linkedinUrl={member.linkedinUrl}
                            instagramUrl={member.instagramUrl}
                            index={memberIndex}
                          />
                        ))}
                      </div>
                    </Suspense>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                      {[...Array(Math.min(8, council.members.length))].map((_, index) => (
                        <PastCouncilCardSkeleton key={index} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const PastCouncilsSection = ({ pastCouncils }: PastCouncilsProps) => (
  <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-slate-950">
    <div className="max-w-8xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "100px" }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Past <span className="text-purple-400">Councils</span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto">
          Celebrating the brilliant minds who built the foundation of
          SMLRA's success across the years.
        </p>
      </motion.div>

      <Suspense fallback={<PastCouncilsLoading />}>
        <PastCouncilsContent pastCouncils={pastCouncils} />
      </Suspense>
    </div>
  </section>
);

const JoinUsSection = () => (
  <section className="py-20 bg-slate-900/30">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "100px" }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Join Our <span className="text-gradient">Community</span>
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          Interested in becoming part of our research community? We're
          always looking for passionate individuals who want to make a
          difference in AI and ML.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 glow-effect">
          Apply Now
        </button>
      </motion.div>
    </div>
  </section>
);

// Main component with data loading suspense
const TeamPageContent = () => {
  const [allTeamsData, setAllTeamsData] = useState<any>(null);

  // Load data on component mount
  useEffect(() => {
    import("@/lib/data/teams.json")
      .then((data) => setAllTeamsData(data.default))
      .catch((error) => console.error("Failed to load team data:", error));
  }, []);

  if (!allTeamsData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading team data...</p>
        </div>
      </div>
    );
  }

  const { faculty, currentTeam, pastCouncils } = allTeamsData;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="mt-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Meet the brilliant minds behind SMLRA's success. Our diverse team
              of researchers, students, and faculty advisors work together to
              push the boundaries of AI and ML.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Faculty Section with Suspense */}
      <Suspense 
        fallback={
          <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-6xl mx-auto">
              <div className="h-12 bg-slate-700 rounded w-64 mx-auto mb-10 animate-pulse"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <FacultyCardSkeleton />
                <FacultyCardSkeleton />
              </div>
            </div>
          </section>
        }
      >
        <FacultySection faculty={faculty} />
      </Suspense>

      {/* Current Team Section */}
      <CurrentTeamSection />

      {/* Past Teams Section with Suspense */}
      <Suspense fallback={<PastCouncilsLoading />}>
        <PastCouncilsSection pastCouncils={pastCouncils} />
      </Suspense>

      {/* Join Us Section */}
      <JoinUsSection />
    </div>
  );
};

export default function TeamPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg">Loading team page...</p>
          </div>
        </div>
      }
    >
      <TeamPageContent />
    </Suspense>
  );
}