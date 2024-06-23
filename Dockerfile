FROM node:22-alpine3.19 AS Build

WORKDIR /

COPY ./ ./

RUN npm install

RUN npm run build


FROM nginx:1.27.0-alpine AS Run

WORKDIR /

COPY --from=Build ./build /usr/share/nginx/html

EXPOSE 80
