import type { Metadata } from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Marwin Emia — AI Automation Specialist',
  description:
    'AI-powered portfolio of Marwin Emia — building automation workflows that save businesses 10–20 hours per week using Make.com, n8n, GoHighLevel, and multi-model AI.',
  keywords: ['AI automation', 'Make.com', 'n8n', 'GoHighLevel', 'Zapier', 'virtual assistant', 'Philippines'],
  authors: [{ name: 'Marwin Emia' }],
  openGraph: {
    title: 'Marwin Emia — AI Automation Specialist',
    description: 'Chat with my AI avatar to explore my projects, skills, and how I can automate your business.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} ${dmSans.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
