# Pagio pagebuilding library

pagio is a drag & drop library that lets you build your own page building application. pagio is meant for developers who want to render large numbers of pages, using

* their own components
* their own rendering strategy (SSR?)

At the core, pagio is simply a Javascript Object tree, which is manipulated with a little React app. pagio can be embedded in any (React) application.

pagio comes with very few direct dependencies:

* react
* styled-components
* nanoid

That said, there is a range of [examples](./example) and integrations readily available to get started immediately. Just use one of the examples to start building right away!

## The idea behing pagio

The main idea behind pagio is a page building tool that lets you to decide how your components are constructed and how your pages are rendered.

It simply creates a Javascript Object, representing a page tree. In the page tree, you find references to your components, the place where they should go and which properties they should have.

Based on the page tree, it is very easy to render a page: 

1. take your data source of choice
2. combine it with your own React components (using the page tree)
3. turn it into a page

This works well with static site generators as NextJS and Gatsby.
