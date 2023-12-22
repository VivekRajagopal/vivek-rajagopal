import React from "react";
import { Helmet } from "react-helmet";

import { Navbar } from "./Navbar";

export const Page = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <Helmet>
        <title>Vivek Rajagopal</title>
      </Helmet>
      <Navbar />
      <main className={className}>{children}</main>
    </>
  );
};
