import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "watchStore | متجر الساعات",
  description: "متجر ساعات فاخرة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.className} bg-slate-950 selection:bg-amber-500 selection:text-black`}
      >
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
