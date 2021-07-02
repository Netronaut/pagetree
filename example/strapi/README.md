# @pagio/example-strapi

## Getting started (docker compose)

Clone the project:

```bash
git clone git@github.com:Netronaut/pagebuilder.git
cd pagebuilder
```

Make sure the library package is installed and built.

```bash
npm install
npm run build
```

Then, enter the example directory, install the library from your local machine and run the docker environment.

```bash
# go to the example
cd example/strapi

# install local @pagio/builder, ready for Docker context to pick it up
npm install $(npm pack ../../ | tail -1)

# build and run all services
docker compose up
```

This will start two services: _app_ and _strapi_

* _app_ is our page builder and admin interface for managing pages. It's web app built with webpack
* _strapi_ is a dockerized Strapi.io Backend and Admin UI which hosts our page data

Both services talk to each other through Docker. _app_ runs webpack-dev-server with a proxy pointing to _strapi_. Thus, all requests to `http://<app host>:<app port>/api/*` are routet to `http://<strapi host>:<strapi port>/*`.

## Developing with `strapi` (docker compose) and `app` (npm start)

Following the above setup, _app_ is not listening for code changes. In order to develop and see your code changes, jus start the services as follows:

```bash
# start strapi service
docker up strapi

# install linked @pagio/builder rather than hard pagio-builder-*.tar.gz
npm link @pagio/builder

# run webpack-dev-server 
npm start
```

## Strapi.io API and admin UI

Additionally, the Strapi.io backend will be available under http://localhost:1337/admin (email: `pagio-demo@netronaut.de`, password: `Pagio1;demo`).
