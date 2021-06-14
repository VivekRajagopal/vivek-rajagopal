import React from "react";
import { Navbar } from "./Navbar";
import { Helmet } from "react-helmet";

export const Page = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <>
      <Helmet>
        <title>Vivek Rajagopal</title>
      </Helmet>
      <main className={className}>
        <Navbar />
        {children}
      </main>
    </>
  );
};
