import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/styles/globals.css";

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#D94F00" />
      </head>
      <body className={`${inter.className} bg-dark-bg text-light-text`}>
        {children}
      </body>
    </html>
  );
}
