FROM nginx:latest

ADD ./dist /usr/share/nginx

EXPOSE 80
