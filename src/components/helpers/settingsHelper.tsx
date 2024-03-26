import { getCollection } from "astro:content";

const settingsRaw = await getCollection("settings");
// console.log(settingsRaw);
const MenuSettings = settingsRaw.find((item) => {
  return item.id === "menu";
});
const GeneralSettings = settingsRaw.find((item) => {
  return item.id === "general";
});
const settings = {
  general: GeneralSettings?.data,
  menu: MenuSettings?.data,
};
export default settings;
