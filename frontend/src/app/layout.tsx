import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SafeX SocialAI — AI-Powered Social Media Intelligence',
  description: 'Predict, explain, and optimize your social media engagement before publishing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}