import './globals.css'

import type { Metadata } from 'next'

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Tommelot Wedding',
  description: 'A wedding site for Tommelot',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
