"use client";
import "./globals.css";
import "./client.css";
import { Questrial, Manrope } from "@next/font/google";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import ProgressBar from "next-nprogress-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Plus_Jakarta_Sans, Bubblegum_Sans } from "next/font/google";
import { ThemeProvider } from "@/utils/themeContext";
import "react-quill/dist/quill.snow.css";
import "yet-another-react-lightbox/styles.css";
import { AuthProvider } from "@/utils/AuthContext";
import Title from "./(main)/components/Title";
export const dynamic = "force-dynamic";
const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext", "vietnamese", "latin"],
  variable: "--font-jakarta",
});
const bubblegum_sans = Bubblegum_Sans({
  weight: ["400"],
  subsets: ["latin-ext", "latin"],
  variable: "--font-bubblegum",
});
// export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <Title
        title="Vora Login"
        description=" Vora is a student social media that allows you to share your thoughts"
      />
      <body
        id="__next"
        className={` ${plus_jakarta_sans.variable} font-jakarta ${bubblegum_sans.variable} 
         `}
      >
        <ProgressBar
          height="6px"
          color="fff"
          options={{ showSpinner: false }}
          shallowRouting
          appDirectory
          style="z-index: 999999999999;"
        />

        <QueryClientProvider client={queryClient}>
          <Toaster />
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
