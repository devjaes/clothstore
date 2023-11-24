import { Urbanist } from "next/font/google";

import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PageWrapper from "@/components/pageWrapper";

import "./globals.css";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Ambivalance",
  description: "Ambivalance - The place for all your purchases.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <ModalProvider />
        <PageWrapper>
          <Navbar />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}
