export const darkmodeClassname = "darkmode";
export const darkmodeSettingName = "setting:darkmode";

export const toggleDarkmode = () => {
  const isDarkmode = document.body.classList.contains(darkmodeClassname);

  document.body.classList.toggle(darkmodeClassname);

  localStorage.setItem(darkmodeSettingName, isDarkmode ? "false" : "true");
};
