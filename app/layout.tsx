import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scrub2Day",
  description: "Scrub2Day is a tool to help you find and watch videos from Soap2Day without any tracking and advertisements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full h-screen min-h-screen p-2`}
      >
      <div className={'w-full h-full rounded-lg bg-transparent overflow-hidden'}>
        {children}
      </div>
      </body>
    </html>
  );
}
