export const darkmodeClassname = "darkmode";
export const darkmodeSettingName = "setting:darkmode";

export const toggleDarkmode = () => {
  document.body.classList.toggle(darkmodeClassname);

  localStorage.setItem(
    darkmodeSettingName,
    `${document.body.classList.contains(darkmodeClassname)}`,
  );
};
