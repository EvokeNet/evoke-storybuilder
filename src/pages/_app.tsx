import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Announcement from "@/components/Announcement";

export default function App({ Component, pageProps }: AppProps) {
  const [announcementHidden, setAnnouncementHidden] = useState(false);
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
