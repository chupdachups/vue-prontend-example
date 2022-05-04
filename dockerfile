FROM node:16.15-alpine

RUN mkdir -p /user/src/app

WORKDIR /user/src/app
ADD ./dist /usr/src/app
#RUN npm install

ENV NODE_ENV=production

RUN npm run build


EXPOSE 8080

CMD ["npm", "start"]