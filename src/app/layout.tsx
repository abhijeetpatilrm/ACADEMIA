import type { Metadata, Viewport } from 'next'
import { Poppins } from "next/font/google"
import './globals.css'
import Provider from '@/providers/Provider';
import ReduxProvider from '@/providers/ReduxProvider';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

const defaultUrl = "https://oarms.vercel.app";
const title = 'ACADEMIA | Empowering Minds, Elevating Futures';
const description = 'OARMS is an educational platform designed to empower students with easy access to study materials. Students can conveniently browse & download PDFs files.';

export const metadata: Metadata = {
  title,
  description,
  keywords: ["abhijeetpatil", "abhijeet", "patil", "OARMS", "Organized", "Academic", "Resource", "Management", "System", "oarms", "abhijeetpatil2001"],
  authors: [{ name: "Abhijeet Patil" }, { url: "https://abhijeetpatil-portfolio.netlify.app/" }],
  creator: "Abhijeet Patil",
  metadataBase: new URL(defaultUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'TSsuy8j81zZ0Ge0aestKiwZUPydASWd9aANj-ITDack',
  },
  icons: {
    icon: '/icons/144.png',
    shortcut: '/favicon.svg',
    apple: '/icons/192.png',
  },
  openGraph: {
    title,
    description,
    url: defaultUrl,
    siteName: 'OARMS',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${defaultUrl}/icons/192.png`,
        width: 192,
        height: 192,
        alt: 'OARMS Logo',
      },
      {
        url: `${defaultUrl}/icons/ARMSDevices.png`,
        width: 1800,
        height: 760,
        alt: 'OARMS Mockup Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@abhijeetpatil',
    images: [
      {
        url: `${defaultUrl}/icons/192.png`,
        width: 192,
        height: 192,
        alt: 'OARMS Logo',
      },
      {
        url: `${defaultUrl}/icons/ARMSDevices.png`,
        width: 1800,
        height: 760,
        alt: 'OARMS Mockup Preview',
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: 'hsl(0 0% 100%)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <Provider attribute="class" enableSystem storageKey='oarms-theme'>
            {children}
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  )
}
