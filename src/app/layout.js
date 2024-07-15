import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth/AuthContext"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nextjs Blog",
  description: "Frontend Nextjs & Backend Django",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="next.svg" /> */}
      <body className={inter.className}><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
