'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import AboutSection from '@/components/about-section'
import ExperienceSection from '@/components/experience-section'
import SkillsSection from '@/components/skills-section'
import ProjectsSection from '@/components/projects-section'
import AISection from '@/components/ai-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import LoadingScreen from '@/components/loading-screen'
import ScrollProgress from '@/components/scroll-progress'
import CustomCursor from '@/components/custom-cursor'
import FloatingTerminalBg from '@/components/floating-terminal-bg'

// Dynamically import 3D background to avoid SSR issues
const Background3D = dynamic(() => import('@/components/background-3d'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <FloatingTerminalBg />
      <Background3D />
      <Navbar />
      
      <main className="relative overflow-x-hidden w-full">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <AISection />
        <ContactSection />
      </main>
      
      <Footer />
    </>
  )
}
