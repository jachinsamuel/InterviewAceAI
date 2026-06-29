import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/styles/globals.css";
import "../src/styles/motion.css";
import { Providers } from "@/components/common/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InterviewAce AI - AI-Powered Interview Preparation",
  description:
    "Master every interview with AI-powered preparation. Practice real interviews, receive instant feedback, and land your dream job.",
  keywords: ["interview prep", "AI", "mock interviews", "coding interviews", "job preparation"],
  authors: [{ name: "InterviewAce" }],
  openGraph: {
    title: "InterviewAce AI - AI-Powered Interview Preparation",
    description:
      "Master every interview with AI-powered preparation. Practice real interviews, receive instant feedback, and land your dream job.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#F59E0B" />
      </head>
      <body className={`${inter.className} bg-dark-bg text-light-text`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
