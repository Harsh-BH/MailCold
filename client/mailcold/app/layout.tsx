import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"

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
      <body className={`${inter.className} bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen`}>
        <div className="min-h-screen backdrop-blur-sm">{children}</div>
      </body>
    </html>
  )
}

