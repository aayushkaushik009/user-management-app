import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar"; // ✅ Import Navbar
import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* ✅ Global Navbar */}
      <Navbar />
      
      {/* ✅ Page Content with Spacing */}
      <main className="container mx-auto px-4 py-6">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default MyApp;
