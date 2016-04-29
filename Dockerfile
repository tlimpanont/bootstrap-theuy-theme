FROM dockerregistry.hamis.nl/nginx:1.9.12

MAINTAINER Port of Rotterdam <noreply@portofrotterdam.com>
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
