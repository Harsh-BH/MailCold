import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cold Mail Generator",
  description: "Generate customized cold mails for professors",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <div className="min-h-screen backdrop-blur-sm">{children}</div>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: 'transparent',
              boxShadow: 'none',
              padding: 0,
              margin: '16px',
            },
          }} 
        />
      </body>
    </html>
  )
}

