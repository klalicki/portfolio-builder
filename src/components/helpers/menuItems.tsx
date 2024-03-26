import { getCollection } from "astro:content";

const homepage = (await getCollection("homepage")) || [];
const pages = (await getCollection("pages")) || [];

const menuItems = [...homepage, ...pages]
  .map((page) => {
    if (page.collection === "homepage") {
      return { url: "/", title: page.data.title || "Home", showInMenu: true };
    } else {
      return {
        url: "/" + page.slug + "/",
        title: page.data.title,
        showInMenu: page.data.publishStatus === "published",
      };
    }
  })
  .filter((page) => {
    return page.showInMenu;
  });

export default menuItems;
