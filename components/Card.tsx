"use client"

import React, { useRef, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

type Position = { x: number; y: number }

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

interface SocialIconsProps {
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "" }) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const isMobile = useIsMobile()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!divRef.current || isMobile) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = (): void => {
    if (!isMobile) {
      setOpacity(0.6)
    }
  }

  const handleMouseLeave = (): void => {
    if (!isMobile) {
      setOpacity(0)
      setIsActive(false)
    }
  }

  const handleClick = (): void => {
    if (isMobile) {
      setIsActive(!isActive)
      setOpacity(isActive ? 0 : 0.6)
    }
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative overflow-visible rounded-2xl shadow-lg p-6 bg-slate-900 text-white ${className}`}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out rounded-2xl"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.1), transparent 80%)`,
        }}
      />

      {/* Children (with social icons toggle logic) */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement<SocialIconsProps>(child)) {
          if (child.props.className?.includes("mt-6 flex gap-4")) {
            return React.cloneElement(child, {
              className: `${child.props.className.replace(
                "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                ""
              )} 
              ${
                isMobile
                  ? isActive
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0"
                  : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
              } 
              transition-all duration-300 pointer-events-auto`,
              onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation()
              },
            })
          }
        }
        return child
      })}
    </div>
  )
}

export default SpotlightCard
