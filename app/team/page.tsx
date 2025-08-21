"use client";

import { useState, Suspense, lazy, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Instagram, Linkedin, ExternalLink } from "lucide-react";
import CurrentTeamCard from "@/components/CurrentTeamCard";

// Lazy load heavy components
const FacultyCard = lazy(() => import("@/components/FacultyCard"));
const PastCouncilCard = lazy(() => import("@/components/CouncilMembers"));

type CurrentTeamMember = {
  name: string;
  position: string;
  department: string;
  imageUrl: string;
  linktreeUrl: string;
};

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

const FacultySection = ({
  faculty,
}: {
  faculty: { members: FacultyMember[] }[];
}) => (
  <section className="w-full px-4 sm:px-6 lg:px-8 py-16 relative">
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Our{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Faculty
          </span>
        </h1>
      </motion.div>
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

const CurrentTeamSection = ({ currentTeam }: { currentTeam: { [key: string]: CurrentTeamMember[] } }) => {
  const teamColors = {
  "Community Lead": "from-emerald-500 to-teal-500",
  "Community Co-Lead": "from-rose-500 to-red-500",
  "Research Team": "from-teal-500 to-cyan-500",
  "Tech Team": "from-purple-500 to-violet-500",
  "Operations Team": "from-orange-500 to-amber-500",
  "Creative Team": "from-fuchsia-500 to-purple-500",
  "Symposium Team": "from-yellow-500 to-lime-500",
  "Marketing Team": "from-indigo-500 to-blue-500"
};


  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Current
            </span>{" "}
            Council{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              2025-2026
            </span>
          </h1>
          <p className="text-slate-300 text-xl max-w-4xl mx-auto leading-relaxed">
            Meet the dedicated students leading SMLRA this year and driving our mission forward with passion and innovation.
          </p>
        </motion.div>

        {/* Department-wise Teams */}
        <div className="space-y-20">
          {Object.entries(currentTeam).map(([teamName, members], teamIndex) => (
            <motion.div
              key={teamName}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: teamIndex * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                  <span className={`bg-gradient-to-r ${teamColors[teamName as keyof typeof teamColors]} bg-clip-text text-transparent text-2xl md:text-3xl lg:text-5xl`}>
                    {teamName}
                  </span>
                </h2>
                <div className={`w-40 h-1 bg-gradient-to-r ${teamColors[teamName as keyof typeof teamColors]} mx-auto rounded-full`}></div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {members.map((member, index) => (
                  <div key={member.name} className="w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] max-w-sm">
                    <CurrentTeamCard member={member} index={index} color={teamColors[teamName as keyof typeof teamColors]} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PastCouncilsLoading = () => (
  <div className="space-y-10">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden animate-pulse"
      >
        <div className="px-6 sm:px-8 py-6 flex items-center justify-between">
          <div className="h-8 bg-slate-700 rounded w-32"></div>
          <div className="h-6 w-6 bg-slate-700 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const PastCouncilsContent = ({
  pastCouncils,
  scrollAnchorRef,
}: PastCouncilsProps & {
  scrollAnchorRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [openCouncils, setOpenCouncils] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleCouncil = (year: string) => {
    setOpenCouncils((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));

    // Scroll to Past Councils heading
    requestAnimationFrame(() => {
      if (scrollAnchorRef.current) {
        const top =
          scrollAnchorRef.current.getBoundingClientRect().top +
          window.scrollY -
          100;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  return (
    <div className="mt-16 px-4 space-y-6">
      {pastCouncils.map((council) => (
        <div key={council.year}>
          <button
            onClick={() => toggleCouncil(council.year)}
            className="w-full flex items-center justify-between p-4 bg-[#1E293B] rounded-lg text-white hover:bg-[#2D3748] transition-colors duration-300"
          >
            <span className="text-xl font-semibold">
              {council.year}
            </span>
            <ChevronDown
              className={`transform transition-transform duration-300 ${
                openCouncils[council.year] ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openCouncils[council.year]
                ? "opacity-100 my-8"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pb-8 pt-8">
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {council.members.map((person, index) => (
                  <PastCouncilCard
                    key={person.name}
                    name={person.name}
                    role={person.role}
                    imageUrl={person.imageUrl || "/placeholder.svg"}
                    githubUrl={person.githubUrl}
                    linkedinUrl={person.linkedinUrl}
                    instagramUrl={person.instagramUrl}
                    index={index}
                    className="w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] max-w-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main component with data loading suspense
const TeamPageContent = () => {
  const [allTeamsData, setAllTeamsData] = useState<any>(null);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  // Load data on component mount
  useEffect(() => {
    import("@/lib/data/teams.json")
      .then((data) => setAllTeamsData(data.default))
      .catch((error) => console.error("Failed to load team data:", error));
  }, []);

  if (!allTeamsData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading team data...</p>
        </div>
      </div>
    );
  }

  const { faculty, currentTeam, pastCouncils } = allTeamsData;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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

      {/* Hero Section */}
      <section className="relative overflow-hidden flex justify-center items-center py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Meet Our{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Team
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            >
              Meet the brilliant minds, dedicated researchers, and
              visionary leaders who have been a part of SMLRA's
              remarkable success and growth across the years. Together, they continue to push the boundaries of what's possible in the rapidly evolving field of AI and ML.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Faculty Section with Suspense */}
      <Suspense
        fallback={
          <section className="w-full px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="h-12 bg-slate-700 rounded w-64 mx-auto mb-16 animate-pulse"></div>
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

      {/* Current Team Section - Now displays all teams directly */}
      <CurrentTeamSection currentTeam={currentTeam} />

      {/* Past Teams Section with Suspense - Dropdown remains */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "100px" }}
            className="text-center mb-16"
            ref={scrollAnchorRef}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Past{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Councils
              </span>
            </h1>
            <p className="text-slate-300 text-xl max-w-4xl mx-auto leading-relaxed">
              Celebrating the brilliant minds who built the foundation of
              SMLRA's success across the years.
            </p>
          </motion.div>

          <Suspense fallback={<PastCouncilsLoading />}>
            <PastCouncilsContent
              pastCouncils={pastCouncils}
              scrollAnchorRef={scrollAnchorRef}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default function TeamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg">Loading team page...</p>
          </div>
        </div>
      }
    >
      <TeamPageContent />
    </Suspense>
  );
}