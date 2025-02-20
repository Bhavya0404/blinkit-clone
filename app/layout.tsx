import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./Components/Navbar/NavBar";
import LandingPage from "./Components/Landing-Page/LandingPage";
import Footer from "./Components/Landing-Page/Footer";
import StoreProvider from "./StoreProvider";


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
        <body>
          <StoreProvider>
            <NavBar />
            {children}
            <div className='lg:w-8/12 w-full h-full m-auto flex flex-col align-middle overflow-hidden'><Footer /></div>  
          </StoreProvider>
        </body>
    </html>
  );
}
