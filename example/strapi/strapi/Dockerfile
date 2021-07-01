FROM node:14-alpine

RUN mkdir /srv/app && chown 1000:1000 -R /srv/app

WORKDIR /srv/app

COPY package.json.tpl package.json
COPY data.db/ .tmp/data.db

RUN npm install

COPY api/ api/
COPY config/ config/
COPY extensions/ extensions/
COPY public/ public/

RUN npm run build

CMD ["npm", "start"]
