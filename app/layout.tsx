import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist'
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Daivesh Naik | Full Stack Developer & AI Engineer',
  description: 'Junior Full Stack Developer passionate about AI-powered applications, scalable backend systems, and modern frontend experiences. Building intelligent digital experiences.',
  keywords: ['Full Stack Developer', 'AI Engineer', 'React', 'Node.js', 'TypeScript', 'Python', 'Machine Learning'],
  authors: [{ name: 'Daivesh Naik' }],
  openGraph: {
    title: 'Daivesh Naik | Full Stack Developer & AI Engineer',
    description: 'Building intelligent digital experiences with cutting-edge technology',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background overflow-x-hidden">
      <body className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        <Toaster position="bottom-right" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
