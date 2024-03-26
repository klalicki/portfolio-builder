import { getCollection } from "astro:content";

const settingsRaw = await getCollection("settings");
// console.log(settingsRaw);
const MenuSettings = settingsRaw.find((item) => {
  return item.id === "menu";
});
const GeneralSettings = settingsRaw.find((item) => {
  return item.id === "general";
});
const SidebarSettings = settingsRaw.find((item) => {
  return item.id === "sidebar";
});
const settings = {
  general: GeneralSettings?.data,
  menu: MenuSettings?.data,
  sidebar: SidebarSettings.data,
};
export default settings;
