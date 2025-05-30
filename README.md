# PauseAI CMS

[![Netlify Status](https://api.netlify.com/api/v1/badges/d24700b8-9bf5-47e2-a140-46d257dc2250/deploy-status)](https://app.netlify.com/projects/pauseai-cms/deploys)

This project is a Decap CMS configuration, enhanced with several plugins, for the PauseAI website.

## Features

- Based on [Decap CMS](https://decapcms.org/)
- Uses [Vite](https://vitejs.dev/) for development and building
- **Logo Plugin**
    - Adds a custom logo to the navigation bar.
- **Prettier Plugin**: 
    - Integrates [Prettier](https://prettier.io/) for code formatting within the CMS editor.
    - Automatically formats markdown content in the body field before saving entries, ensuring consistent content formatting.
- **Slug Plugin**:
    - Hides the slug field when editing existing entries as slugs cannot be changed after creation.
    - Hides the "optional" label for the slug field in new entries, as it is actually required but only for new posts.
- **Dark Mode**: Implements dark mode support using [Darkreader](https://darkreader.org/).

## Collections

The CMS is configured for managing "posts" with the following fields:

- `title`: Title of the post (String)
- `slug`: Slug for the post URL (String, optional)
- `description`: Short description of the post (String, optional)
- `image`: Featured image for the post (Image, optional)
- `author`: Author of the post (String, optional)
- `date`: Date of the post (Datetime, optional)
- `body`: Main content of the post (Markdown)

## Backend

- **Backend**: GitHub
- **Repository**: `PauseAI/pauseai-website`
- **Branch**: `main`

## Dependencies

- darkreader: For dark mode support
- decap-cms-app: The Decap CMS application
- prettier: Code formatter
- react and react-dom: React libraries (Decap CMS dependency)
- vite: Build tool

## Development

To run the development server:

```bash
pnpm dev
```

## Build

To build the project:

```bash
pnpm build
