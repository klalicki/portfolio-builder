import { getCollection } from "astro:content";

const homepage = (await getCollection("homepage")) || [];
const pages = (await getCollection("pages")) || [];
const allProjectsUnsorted = (await getCollection("projects")) || [];
const portfolioGroups = (await getCollection("portfolioGroups")) || [];

const allProjects = allProjectsUnsorted.sort((a, b) => {
  const idA = a.data.sortID || 0;
  const idB = b.data.sortID || 0;
  return idA - idB;
});

const getProjectList = (portfolioGroupSlug: string) => {
  let projectList;
  const rawProjectSource = portfolioGroups.find((item) => {
    return item.slug === portfolioGroupSlug;
  });
  let projectSource: any = {};
  if (!rawProjectSource) {
    projectSource.discriminant = "all";
  } else {
    projectSource = rawProjectSource.data.projectSource;
  }
  // console.log("projectSource", projectSource);

  if (projectSource.discriminant === "selected") {
    projectList = projectSource.value.map((slug: string) => {
      return allProjects.find((project) => {
        return project.slug === slug;
      });
    });
  } else {
    //@ts-ignore;
    projectList = allProjects;
  }
  return projectList;
};

const menuItems = [...homepage, ...pages]
  .sort((a, b) => {
    const idA = a.data.sortID || 0;
    const idB = b.data.sortID || 0;
    return idA - idB;
  })
  .flatMap((page) => {
    if (
      page.data.publishStatus === "unlisted" ||
      page.data.publishStatus === "unpublished"
    ) {
      return [];
    }
    // console.log(page);
    if (page.data?.customNavigation?.discriminant) {
      // page has customNav;
      const customNav = page.data.customNavigation.value;

      return customNav.map(
        (
          customNavItem: { title: string; subItems: string },
          itemIndex: number
        ) => {
          const projects = getProjectList(customNavItem.subItems);

          const projectNavItems = projects
            .map(
              (project: {
                data: { title: string; publishStatus: string };
                slug: string;
              }) => {
                const hideProject =
                  project.data.publishStatus === "unlisted" ||
                  project.data.publishStatus === "unpublished";

                return {
                  title: project.data.title,
                  showInMenu: !hideProject,
                  url: "/projects/" + project.slug + "/",
                };
              }
            )
            .filter((item: { showInMenu: boolean }) => {
              return item.showInMenu;
            });

          const workingSlug = page.slug === "index" ? "" : page.slug + "/";
          return {
            url:
              "/" +
              workingSlug +
              (itemIndex === 0
                ? "#main-content"
                : "#section-" + customNavItem.subItems),

            title: customNavItem.title || page.data.title || "Home",
            showInMenu: true,
            subItems: projectNavItems,
            groupID: page.slug + "-" + customNavItem.subItems,
          };
        }
      );
    } else {
      if (page.collection === "homepage") {
        return {
          url: "/",
          title: page.data.title || "Home",
          showInMenu: true,
          subItems: [],
        };
      } else {
        return {
          url: "/" + page.slug + "/",
          title: page.data.title,
          showInMenu: page.data.publishStatus === "published",
          subItems: [],
        };
      }
    }
  })
  .filter((page) => {
    return page.showInMenu;
  });

export default menuItems;
