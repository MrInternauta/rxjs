# build environment
FROM node:18.6.0-alpine as builder
WORKDIR /usr/src/app

#RUN mkdir /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY [".", "/usr/src/app"]
RUN npm install
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]