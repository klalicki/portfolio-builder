# portfolio-builder

A portfolio builder/static site generator built with Keystatic CMS and Astro.

## Getting Started

To start, make a copy of this repository by clicking the "Use this template" button. This will create a new repository in your account with the same files and folders as this one. 

Then, open the repository in GitHub Codespaces by clicking the "Code" button and selecting "Open with Codespaces". This will open the repository in a new Codespaces environment, a cloud-based editor that has everything you need to build and run the project.

Once the Codespaces environment is ready, open a terminal and run the following commands to install the dependencies and start the development server:

To setup:

```bash
npm install
```

To run:

```bash
npm run dev
```

If at any point the development server crashes or is not working correctly, you can close it by pressing `Ctrl + C` in the terminal and then run `npm run dev` again.

Once the server is running, you can view the site in your browser by visiting the following URLs:

Admin UI: [http://127.0.0.1:4321/keystatic](http://127.0.0.1:4321/keystatic)

Homepage: [http://localhost:4321](http://localhost:4321)

It's most effective to have two browser windows open side by side, one for the Admin UI and one for the homepage. This way you can see changes in real-time as you make them in the Admin UI. The Admin UI does show a preview of content as you edit, but it's not 100% accurate to the live site.

### Working in Git

On this project, you will be working in Git, a version control system that allows you to keep track of changes to your site as you make them. This is important because it allows you to save your work, collaborate with others, and revert changes if something goes wrong.

A 'commit' in Git is like a snapshot of your entire site at a specific point in time. You can make a commit whenever you want to save your work. It's a good idea to make a commit whenever you make a significant change, like adding a new page or editing a large block of text. If you make a change that completely breaks your site, you can revert to a previous commit to undo the changes. A commit is stored with a short message that describes the changes you made.

To make a commit, you can use the Codespaces 'Source Control' panel on the left side. This panel shows all the files that have changed since the last commit. You don't need to worry about the list of files, just write a short message in the text box describing the changes you have made, and then click the checkmark button to commit. 

Sometimes, the 'commit' button will change to a 'push' button. When you click 'push', it will send all your commits back to GitHub, and will cause the live site to update with your changes. Make sure to click 'push' when you are done working on your site for the day, so that your changes are saved and visible to others. 


## Editing Content

In the CMS, there are three types of pages you can edit. All three provide an editor that allows you to add text, images, and other content to the page. You can also add special blocks, including column layouts, HTML embeds, and image galleries.

- **Projects**: These are individual items in your portfolio. Each item has a title, descriptions, thumbnail image, and custom accent color.

- **Pages**: These are the main pages of the site, like the about page, portfolio page, and contact page. These are built in an editor that allows you to add text, images, and other content to the page. You can also add special blocks, including a portfolio grid.

- **Homepage**: This is a special page that is used for the homepage of the site. Other than that, it is the same as a regular page.

# Organizing Content

This project uses a flexible system of pages and projects to organize content, focused around the organization needs of artists and designers. Here's how it works:

- **Portfolio Groups**: This site allows you to organize your projects into groups. There is a default 'all' group that shows all projects, but you can create additional groups to organize your work. For example, you could have a group for 'Illustration' and a group for 'Design', or you could even create a custom group of projects that you want to share for a specific occasion. In each portfolio group, you can select which projects you want to include, and the order in which they will be displayed. _Note: Creating a portfolio group doesn't automatically add it to the navigation menu. You will still need to add it in one or both of the following places:_

  - **Portfolio View component**: This is the component you can place in a page to display a grid of projects. You can select which portfolio group to display, and customize the layout of the grid. You can place multiple Portfolio View components on a single page to show different groups of projects. _Note: This component is only available in Pages and the Homepage, not Projects_ 

  - **Navigation Menu (Show Sub-items in Nav)**: If you want the portfolio items to show up in the site menu, you can check the 'Show Sub-items in Nav' box on a page, which will allow you to select one or multiple portfolio groups to show in the navigation menu.