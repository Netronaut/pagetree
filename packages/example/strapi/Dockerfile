FROM node:16-alpine

RUN mkdir /srv/app

WORKDIR /srv/app

COPY package.json .
COPY pagetree-builder-0.1.0.tgz .

# should ignore all node_module/** (but not node_module/@pagetree) in .dockerignore
# we actually need this so the local instance of the @pagetree/builder library
# can be installed into this docker image
COPY node_modules/ node_modules/

COPY src/ src/
COPY .babelrc .
COPY tsconfig.json .
COPY webpack.config.js .

RUN npm install

CMD ["npm", "start"]
