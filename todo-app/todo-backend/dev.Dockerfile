FROM node:16

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV debug=playground:*

CMD npm run dev