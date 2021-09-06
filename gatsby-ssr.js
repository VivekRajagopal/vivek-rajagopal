import React from "react";

import { darkmodeClassname, darkmodeSettingName } from "./src/utils/darkmode";

const DarkmodeScript = () => {
  const codeToRunOnClient = `
(function() {
  if (localStorage.getItem("${darkmodeSettingName}") === "true") {
    document.body.classList.add("${darkmodeClassname}");
  }
})()
  `;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<DarkmodeScript />);
};
