import React from "react";
import { Helmet } from "react-helmet";
import { darkmodeClassname, darkmodeSettingName } from "../utils/darkmode";
import { Navbar } from "./Navbar";

const darkmodeScriptRaw = `
(function() {
  if (localStorage.getItem("${darkmodeSettingName}") === "true") {
    document.body.classList.add("${darkmodeClassname}");
  }
})();
`;

export const Page = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <>
      <Helmet
        script={[
          {
            type: "text/javascript",
            innerHTML: darkmodeScriptRaw
          }
        ]}
      >
        <title>Vivek Rajagopal</title>
      </Helmet>
      <main className={className}>
        <Navbar />
        {children}
      </main>
    </>
  );
};
