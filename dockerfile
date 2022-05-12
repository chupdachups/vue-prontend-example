FROM nginx:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD ./dist /usr/src/app
ADD ./my-front.web /etc/nginx/sites-available/my-front.web


EXPOSE 80