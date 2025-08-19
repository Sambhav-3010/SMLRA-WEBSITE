// 'use client';

// import React, { useState, useRef, useEffect, useCallback } from 'react';

// interface CarouselItem {
//   id: number;
//   title: string;
//   subtitle: string;
// }

// interface CarouselProps {
//   items: CarouselItem[];
//   className?: string;
//   autoplay?: boolean;
//   autoplayInterval?: number;
// }

// // Logo component for displaying company logos
// const CompanyLogo: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => {
//   const getLogoConfig = (companyName: string) => {
//     const configs: Record<string, { gradient: string; letter: string }> = {
//       'Perplexity': { gradient: 'bg-gradient-to-br from-purple-600 to-blue-600', letter: 'P' },
//       'OpenAI': { gradient: 'bg-gradient-to-br from-green-500 to-teal-600', letter: 'O' },
//       'Stability': { gradient: 'bg-gradient-to-br from-purple-500 to-pink-600', letter: 'S' },
//       'META': { gradient: 'bg-gradient-to-br from-blue-600 to-blue-800', letter: 'M' },
//       'Anthropic': { gradient: 'bg-gradient-to-br from-orange-500 to-red-600', letter: 'A' },
//       'Mistral': { gradient: 'bg-gradient-to-br from-gray-700 to-gray-900', letter: 'M' },
//       'ElevenLabs': { gradient: 'bg-gradient-to-br from-indigo-600 to-purple-600', letter: 'E' },
//       'Groq': { gradient: 'bg-gradient-to-br from-orange-600 to-red-600', letter: 'G' },
//       'LangChain': { gradient: 'bg-gradient-to-br from-green-600 to-emerald-600', letter: 'L' },
//       'Replit': { gradient: 'bg-gradient-to-br from-orange-500 to-yellow-600', letter: 'R' },
//       'Jasper': { gradient: 'bg-gradient-to-br from-purple-600 to-indigo-600', letter: 'J' },
//       'xAI': { gradient: 'bg-gradient-to-br from-gray-800 to-black', letter: 'X' }
//     };
//     return configs[companyName] || { gradient: 'bg-gradient-to-br from-gray-500 to-gray-700', letter: companyName.charAt(0) };
//   };

//   const config = getLogoConfig(name);

//   return (
//     <div className={`w-full h-full flex items-center justify-center text-white font-bold text-3xl ${config.gradient} ${className}`}>
//       {config.letter}
//     </div>
//   );
// };

// const Carousel: React.FC<CarouselProps> = ({ 
//   items, 
//   className = '', 
//   autoplay = true,
//   autoplayInterval = 3000 
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const autoplayRef = useRef<NodeJS.Timeout | null>(null);

//   // Calculate how many cards are visible based on screen size
//   const getVisibleCards = useCallback(() => {
//     if (typeof window !== 'undefined') {
//       if (window.innerWidth >= 1024) return 4; // lg: 4 cards
//       if (window.innerWidth >= 768) return 2;  // md: 2 cards
//       return 1; // sm and below: 1 card
//     }
//     return 4;
//   }, []);

//   const [visibleCards, setVisibleCards] = useState(getVisibleCards);

//   useEffect(() => {
//     const handleResize = () => {
//       setVisibleCards(getVisibleCards());
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [getVisibleCards]);

//   // Navigation functions
//   const goToNext = useCallback(() => {
//     setCurrentIndex(prev => (prev + 1) % items.length);
//   }, [items.length]);

//   const goToPrevious = useCallback(() => {
//     setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
//   }, [items.length]);

//   // Autoplay functionality
//   useEffect(() => {
//     if (autoplay && !isHovered && !isDragging) {
//       autoplayRef.current = setInterval(goToNext, autoplayInterval);
//     } else {
//       if (autoplayRef.current) {
//         clearInterval(autoplayRef.current);
//         autoplayRef.current = null;
//       }
//     }

//     return () => {
//       if (autoplayRef.current) {
//         clearInterval(autoplayRef.current);
//       }
//     };
//   }, [autoplay, autoplayInterval, isHovered, isDragging, goToNext]);

//   // Touch/mouse drag handlers
//   const handleDragStart = (clientX: number) => {
//     setIsDragging(true);
//     setDragStart(clientX);
//   };

//   const handleDragEnd = (clientX: number) => {
//     if (!isDragging) return;
    
//     const dragDistance = dragStart - clientX;
//     const threshold = 50;

//     if (Math.abs(dragDistance) > threshold) {
//       if (dragDistance > 0) {
//         goToNext();
//       } else {
//         goToPrevious();
//       }
//     }

//     setIsDragging(false);
//     setDragStart(0);
//   };

//   // Mouse events
//   const handleMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();
//     handleDragStart(e.clientX);
//   };

//   const handleMouseUp = (e: React.MouseEvent) => {
//     handleDragEnd(e.clientX);
//   };

//   // Touch events
//   const handleTouchStart = (e: React.TouchEvent) => {
//     handleDragStart(e.touches[0].clientX);
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     if (e.changedTouches[0]) {
//       handleDragEnd(e.changedTouches[0].clientX);
//     }
//   };

//   // Calculate transform for current view
//   const cardWidth = 100 / visibleCards;
//   const translateX = -(currentIndex * cardWidth);

//   return (
//     <div 
//       className={`relative w-full ${className}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Navigation Arrows */}
//       <button
//         onClick={goToPrevious}
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-200 group"
//         aria-label="Previous slide"
//       >
//         <svg className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>

//       <button
//         onClick={goToNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-200 group"
//         aria-label="Next slide"
//       >
//         <svg className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//       {/* Carousel Container */}
//       <div className="overflow-hidden px-12">
//         <div
//           ref={carouselRef}
//           className={`flex transition-transform duration-500 ease-in-out ${
//             isDragging ? 'cursor-grabbing' : 'cursor-grab'
//           }`}
//           style={{
//             transform: `translateX(${translateX}%)`,
//           }}
//           onMouseDown={handleMouseDown}
//           onMouseUp={handleMouseUp}
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           {items.map((item, index) => (
//             <div
//               key={item.id}
//               className="flex-shrink-0 px-2"
//               style={{ width: `${cardWidth}%` }}
//             >
//               <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full group">
//                 {/* Square Logo Container */}
//                 <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
//                   <CompanyLogo 
//                     name={item.title} 
//                     className="group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
                
//                 {/* Card Content */}
//                 <div className="p-4">
//                   <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
//                     {item.subtitle}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Pagination Dots */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {items.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-2 h-2 rounded-full transition-all duration-300 ${
//               index === currentIndex
//                 ? 'bg-blue-600 w-6'
//                 : 'bg-gray-300 hover:bg-gray-400'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Example usage component matching the AI companies theme
// const TensorProtocolCarousel: React.FC = () => {
//   const aiCompanies: CarouselItem[] = [
//     {
//       id: 1,
//       title: 'Perplexity',
//       subtitle: 'AI-powered search and discovery platform revolutionizing how we find information'
//     },
//     {
//       id: 2,
//       title: 'OpenAI',
//       subtitle: 'Leading artificial intelligence research company developing cutting-edge AI systems'
//     },
//     {
//       id: 3,
//       title: 'Stability',
//       subtitle: 'Democratizing AI through open-source generative models and tools'
//     },
//     {
//       id: 4,
//       title: 'META',
//       subtitle: 'Building the metaverse and advancing AI research for global connectivity'
//     },
//     {
//       id: 5,
//       title: 'Anthropic',
//       subtitle: 'AI safety company focused on developing helpful, harmless, and honest AI systems'
//     },
//     {
//       id: 6,
//       title: 'Mistral',
//       subtitle: 'European AI company creating efficient and performant large language models'
//     },
//     {
//       id: 7,
//       title: 'ElevenLabs',
//       subtitle: 'Advanced AI voice synthesis and speech generation technology platform'
//     },
//     {
//       id: 8,
//       title: 'Groq',
//       subtitle: 'Ultra-fast AI inference hardware and software solutions for real-time applications'
//     },
//     {
//       id: 9,
//       title: 'LangChain',
//       subtitle: 'Framework for developing applications powered by language models'
//     },
//     {
//       id: 10,
//       title: 'Replit',
//       subtitle: 'Online IDE and coding platform with AI-powered development tools'
//     },
//     {
//       id: 11,
//       title: 'Jasper',
//       subtitle: 'AI writing assistant for creating high-quality marketing content'
//     },
//     {
//       id: 12,
//       title: 'xAI',
//       subtitle: 'AI company focused on understanding the true nature of the universe'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
//       {/* Header Section */}
//       <div className="pt-20 pb-12 px-4">
//         <div className="max-w-6xl mx-auto text-center">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
//             Exploit the knowledge gap, directly from your inbox
//           </h1>
//           <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
//             Discover leading AI companies and platforms that are shaping the future of artificial intelligence
//           </p>
//         </div>
//       </div>

//       {/* Carousel Section */}
//       <div className="px-4 pb-20">
//         <Carousel 
//           items={aiCompanies} 
//           autoplay={true}
//           autoplayInterval={3000}
//           className="max-w-7xl mx-auto"
//         />
//       </div>

//       {/* Background Decoration */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-2 h-2 bg-orange-500 rounded-full opacity-60"></div>
//         <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full opacity-40"></div>
//         <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full opacity-50"></div>
//         <div className="absolute bottom-60 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-30"></div>
//         <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-yellow-400 rounded-full opacity-40"></div>
//       </div>
//     </div>
//   );
// };

// export default TensorProtocolCarousel;