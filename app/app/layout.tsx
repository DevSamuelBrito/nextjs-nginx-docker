import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Nextjs Docker Nginx",
  description: "A simple Next.js application running with Docker and Nginx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
