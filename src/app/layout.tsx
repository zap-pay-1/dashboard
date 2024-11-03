import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserContextProvider } from "@/components/providers/user-context";
import { ClientProviders } from "@/components/providers/client-provider";
import { Toaster } from "@/components/ui/toaster"
import NextTopLoader from 'nextjs-toploader';
import { ParticleConnectkit } from "@/components/providers/connect-kit";
import { CiWarning } from "react-icons/ci";
import DashboardNav from "@/components/dashbord-nav";
import Sidebar from "@/components/sidebar/side-bar";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Seamless Web3 Payments & Invoicing for Modern Merchants",
  description:
    "Effortlessly create invoices and payment links using our Web3 platform. Accept payments in crypto, manage transactions, and streamline your merchant operations.",

  keywords: [
    "Web3 payments",
    "Crypto payments",
    "recurring payments",
    "Telegram subscription",
    "earn from Telegram",
    "Zap",
  ],

  openGraph: {
    title: "Seamless Web3 Payments & Invoicing for Modern Merchants",
    description:
      "Effortlessly create invoices and payment links using our Web3 platform. Accept payments in crypto, manage transactions, and streamline your merchant operations.",
    url: "https://www.munapay.xyz",
    images: [
      {
        url: "/img/monitize-tg.png",
        width: 800,
        height: 600,
        alt: "Monetize your Telegram community with Zap",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Seamless Web3 Payments & Invoicing for Modern Merchants",
    description:
      "Effortlessly create invoices and payment links using our Web3 platform. Accept payments in crypto, manage transactions, and streamline your merchant operations.",
    images: ["/images/monetize-tg.png"],
  },


};

export default function RootLayout({/// 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
        <UserContextProvider>
        <NextTopLoader
        color="#f97316"
        showSpinner={false}
        />
        <ParticleConnectkit>
        <div>
        <div className='h-8 max-w-xl my-3 mx-auto  w-full flex space-x-2 text-red-500 items-center justify-center md:hidden'> 
            <CiWarning  />
             <h1 className='text-sm font-mono'>Dasboard is not optimised for mobile/small devices yet use your pc for better experience</h1>
          </div>
            <div className='border-b h-[60px] bg-background z-30  sticky top-0 md:ml-[205px] px-3 flex items-center '>
   <DashboardNav  />
      </div>
           
      <div className='min-h-screen'>
        <div className=' hidden  md:flex md:w-[200px] border-r h-screen fixed top-0 bg-gradient-to-tr from-zinc-100 to-zinc-100'><Sidebar  /></div>
        <div  className='md:ml-[205px]'>
        
         {children}
       
         </div>
      </div>
        </div>
        </ParticleConnectkit>
        <Toaster  />
        </UserContextProvider>
        </ClientProviders>

      </body>
    </html>
  );
}
