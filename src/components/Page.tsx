import React from "react";
import { Navbar } from "./Navbar";

export const Page = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <main className={className}>
      <Navbar />
      {children}
    </main>
  );
};
