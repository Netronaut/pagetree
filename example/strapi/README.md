# @pagio/example-strapi

## Getting started

```bash
cd example/strapi

# install @pagio/builder dependency without symlinks into the local Docker context:
npm install $(npm pack ../../ | tail -1)

# build and run all services
docker compose up

```

The Strapi.io backend will be available under http://localhost:1337/admin (email: `pagio-demo@netronaut.de`, password: `Pagio1;demo`).
