import './globals.css'

import type { Metadata } from 'next'
import { Red_Hat_Mono } from 'next/font/google'

const redHatMono = Red_Hat_Mono({ subsets: ['latin'] })

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Tommelot Wedding',
  description: 'A wedding site for Tommelot',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={redHatMono.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>
      </body>
    </html>
  )
}
