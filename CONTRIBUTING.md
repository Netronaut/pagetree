# Contributing - working agreements

## Conventional commits & branch names

Branch names are formed in this pattern:

<ticket-id>-short-description

for example:

_PAG-59-feature-add-some-stuff_

## Design principles

- Co-location - place code as close to where it's relevant as possible

## Typings

Following the colocation principle, typings are built in this order:

- place component props into the component file
- place typings used for one module into the modue file
- or, if the module consists of submodules, into a module.types.ts file
- place globally used types into src/types.ts
- export all types and interfaces upwards using named exports
