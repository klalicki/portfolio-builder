# portfolio-builder

A portfolio builder/static site generator built with Keystatic CMS and Astro.

## Quickstart

Open the terminal and run the following commands

To setup:

```bash
npm install
```

To run:

```bash
npm run dev
```

## Note

This is a work in progress, and may still have some bugs. If you find any issues, please let me know and I'll work with you to get it fixed!

In addition, if you have any feature requests or suggestions, please let me know. I'm always looking for ways to improve this project.

## GitHub Pages vs Netlify

This project is designed to be deployed GitHub Pages, a free hosting platform that is integrated with GitHub. Because of the structure of this site, it is only able to be deployed to the root of a GitHub Pages site, and not to a subdirectory. This means that if you want to host this site on GitHub Pages, you will need to give your repository the name `username.github.io`, where `username` is your GitHub username. You can then deploy this site to that repository.

If you already have a site hosted at 'username.github.io', you can still use this project by deploying it to Netlify, a free hosting platform that has similar features. 

## Getting Started

Follow one of the deployment methods below to get your site up and running.

### Netlify (Recommended)

To start, make a copy of this repository by clicking the "Use this template" button. This will create a new repository in your account with the same files and folders as this one. 

Go to the Settings tab of your repository. On the left side, click 'Actions', then 'General'. Switch 'Actions permissions' to 'Disable actions'. This will stop GitHub Pages from trying to deploy the site, since we will be using Netlify instead.

Create an account on Netlify if you don't already have one. On the Netlify dashboard, under 'Sites', click 'Add new site', then 'Import an existing project'. Click 'Deploy with  GitHub' - it will ask you to authorize Netlify to access your GitHub account.

Select your repository from the list of repositories. On the next page, you can set a site name - this will become part of your site's URL as sitename.netlify.app. You can change this later as well.

Click the deploy button at the bottom of the screen, and Netlify will start building your site. This will probably take about a minute to complete. Once it is complete you will have a live URL for your site.

### GitHub Pages

_Note: this method requires that you DO NOT currently have a site hosted at `username.github.io`. If you do, you will need to use Netlify instead._

To start, make a copy of this repository by clicking the "Use this template" button. This will create a new repository in your account with the same files and folders as this one. 

In the repo, rename the folder ".github-actions" to ".github". This will allow the GitHub Actions workflow to run correctly.

Go into 'Settings' on the repository, and scroll down to the 'GitHub Pages' section. Under 'Build and deployment', change the 'Source' to 'GitHub Actions'.

Still in the Settings tab: On the left side, click 'Actions', then 'General'. Make sure 'Actions permissions' is set to 'Allow all actions and reusable workflows'. 

Go to 'Actions' in the top tab bar, click 'Deploy Astro site to Pages' on the left, and then click 'Run workflow'. Select 'main' as the branch. This will deploy the site to GitHub Pages. This will probably take about a minute to complete.Once it is complete you will have a live URL for your site, which will be `https://username.github.io`.

## Starting Codespaces

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

- **Homepage**: This is a special page that is used for the homepage of the site and cannot be unlisted or unpublished. Other than that, it is the same as a regular page.

### Publish Status

Each page and project has a 'publish status' that determines whether it is visible on the live site. There are three options:

- **Published**: The page or project is visible on the live site.

- **Unpublished**: The page or project is not visible on the live site.

- **Unlisted**: The page or project is visible on the live site, but it is hidden from the navigation menu and 'all' portfolio group (for projects only). You can still access the page by visiting its URL directly. In addition, unlisted projects can be added to custom portfolio groups and displayed on the site using the Portfolio View component. This can be useful if you want to share a project with a specific group of people without making it public. _Note: unlisted projects can still be found by others on the internet - if you are legally required to keep a project confidential, this will ***NOT*** suffice._

## Organizing Content

This project uses a flexible system of pages and projects to organize content, focused around the organization needs of artists and designers. Here's how it works:

- **Portfolio Groups**: This site allows you to organize your projects into groups. There is a default 'all' group that shows all projects, but you can create additional groups to organize your work. For example, you could have a group for 'Illustration' and a group for 'Design', or you could even create a custom group of projects that you want to share for a specific occasion. In each portfolio group, you can select which projects you want to include, and the order in which they will be displayed. _Note: Creating a portfolio group doesn't automatically add it to the navigation menu. You will still need to add it in one or both of the following places:_


  - **Portfolio View component**: This is the component you can place in a page to display a grid of projects. You can select which portfolio group to display, and customize the layout of the grid. You can place multiple Portfolio View components on a single page to show different groups of projects. _Note: This component is only available in Pages and the Homepage, not Projects_ 

  - **Navigation Menu (Show Sub-items in Nav)**: If you want the portfolio items to show up in the site menu, you can check the 'Show Sub-items in Nav' box on a page, which will allow you to select one or multiple portfolio groups to show in the navigation menu, and to select a title that will appear in the nav menu for that portfolio group.

## Editing Content

All three page types have a similar editor that allows you to add text, images, and other content to the page. You can also add special blocks, including column layouts, HTML embeds, and image galleries.


## Components

The site has an assortment of components available in pages and projects. All of these components also provide a field to add a custom CSS class, which you can style using the site-wide custom CSS field (in General Settings) Here are some of the components you can use:

#### Page Section

This component is quite flexible. It basically creates a section of the page that you can place other content or components into. You can customize the size and spacing of the section, and add a background color or image.

#### Custom Font

This component allows you select a piece of text and change its font family/size/weight/style/color.

#### Image Popout

This component allows you to add an image to the page that can be clicked on to view a larger version. You can also add a caption to the image.

#### Image Gallery

This component allows you to add a gallery of images to the page. Each image can have a caption. When you click on an image, it will open in a lightbox where you can view a larger version of the image, and scroll through the other images in the gallery.

#### Hero Section

A header component with a background image (that supports parallax scrolling) and a place to put text or other content.

#### Multi-Column Layout

This component gives you a powerful and flexible multi-column layout where you can set the size of each column, and control how the columns stretch/shrink on different screen sizes.

#### Simple 12-col Multi-Column Layout

This component gives you a simpler multi-column layout where you can place content in a 12-column grid. This layout automatically collapses to a single column on smaller screens

#### HTML Embed

This component allows you to insert raw HTML code. This would be useful for embedding a video, audio player, or other custom content.

#### Custom Width Container

This allows you to create a section of content that is a specific width, rather than the site-wide content width. This can be useful for creating a section that stands out from the rest of the page.

#### Link to File

This component allows you to upload a file to the site and create a link. This is useful for sharing documents like PDFs.

#### Custom CSS Container

This component creates a `<div>` and gives you the ability to add CSS directly to it. You can insert other content inside this component.

### Portfolio Views (Pages and Homepage only)

This component allows you to display a grid of projects from a specific portfolio group, or from the 'all items' group. 
There are 4 different layouts to choose from. All layouts can be customized from the 'Portfolio Layout Settings' section in the editor.

## Menu

There are two menu variants available in the site: a topbar and a side panel. On both variants, the menu becomes a 'hamburger' on smaller screens. The menu's items are automatically generated from the pages and portfolio groups you have created. You can adjust spacing, colors, and fonts in the 'Menu' section of the editor.

## Fonts

The site is able to load fonts from Google Fonts and Adobe Fonts, as well as any other font service that provides a `<link>` tag to include in the document. You can specify 3 font familes to use in the 'Link Fonts' section of the editor.

For each font family, you will need the `<link>` tag from the font service. You will also need to paste the 'font-family' text from the font service. Make sure that you don't include the text 'font-family:' in the field, just the font name and fallback fonts.

## Typography Options

This is where you set the font parameters for the entire site. I know this page looks kinda overwhelming, but I promise it is easier to use than it looks. At the top you can set a base font size for desktop and mobile devices. You will then be able to use 'rem' units when setting font sizes elsewhere to have them based on this base size. 1rem is equal to the base font size.

## Custom CSS

In the 'General Settings' section, you can add custom CSS that will be applied across the site. This is useful for making small tweaks to the design that aren't available in the editor. If you add custom CSS classes to a component, you will be able to style it using this field.

_Note that CSS specificity rules still apply, so you may need to use more specific selectors to override the default styles._

# Questions/Issues/Feature Requests

If you have any questions, issues, or feature requests, please open an issue on this repository or email me! I'm always looking for ways to improve this project and make it more useful for others.