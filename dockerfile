FROM nginx:latest

ADD ./dist /some/content:/usr/share/nginx

EXPOSE 80
