<h1>
  <img src="./pagetree.svg" alt="pagetree brand icon" style="height: 1em;" />
  Pagetree &ndash; page building library
</h1>

pagetree is a drag & drop library that lets you build your own page building application. pagetree is meant for developers who want to render large numbers of pages, using

* their own components
* their own rendering strategy (SSR?)

At the core, pagetree is simply a Javascript Object tree, which is manipulated with a little React app. pagetree can be embedded in any (React) application.

pagetree comes with very few direct dependencies:

* react
* styled-components
* nanoid

That said, there is a range of [examples](./packages/example) and integrations readily available to get started immediately. Just use one of the examples to start building right away!

## The idea behing pagetree

The main idea behind pagetree is a page building tool that lets you to decide how your components are constructed and how your pages are rendered.

It simply creates a Javascript Object, representing a page tree. In the page tree, you find references to your components, the place where they should go and which properties they should have.

Based on the page tree, it is very easy to render a page: 

1. take your data source of choice
2. combine it with your own React components (using the page tree)
3. turn it into a page

This works well with static site generators as NextJS and Gatsby.

## Getting started

This project uses [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

To get started, first install the project with all it's dependencies:

```bash
npm run install
```

This will install all dependencies of all packages.

Now build the project and run the first basic example:

```bash
npm run build
npm start -w @pagetree/example-basic
```

This builds the core library (packages/builder) and starts the first example in [packages/example/basic](packages/example/basic).

To start developing, run `npm run dev` or `npm test`, to work with the ui components, run `npm run storybook`.

## List of available commands

Tasks at the root level:

```bash
npm install
npm test
npm run lint
npm run build
npm run dev
npm run storybook
```

Examples:

```bash
# @pagetree/example-basic
npm start -w @pagetree/example-basic

# @pagetree/example-strapi
npm run strapi -w @pagetree/example-strapi
npm start -w @pagetree/example-strapi
```
