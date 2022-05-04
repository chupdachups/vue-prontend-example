FROM node:16.15-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD ./ /usr/src/app
RUN npm install

ENV NODE_ENV=production

RUN npm run build

# Remove unused directories
RUN rm -rf ./src
#RUN rm -rf ./build

EXPOSE 8080

CMD ["npm", "start"]