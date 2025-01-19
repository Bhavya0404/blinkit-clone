import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./Components/Navbar/NavBar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import LandingPage from "./Components/Landing-Page/LandingPage";
import Footer from "./Components/Landing-Page/Footer";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Everything Delivered in minutes | Blinkit",
  description: "Blinkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme>
      <UserProvider>
        <body>
          <NavBar />
          {children}
          <div className='w-8/12 h-full m-auto flex flex-col align-middle overflow-hidden'><Footer /></div>
          
        </body>
      </UserProvider>
    </html>
  );
}
