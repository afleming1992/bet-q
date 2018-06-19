FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install --production

RUN rm -rf /usr/src/app/dist

COPY /dist /usr/src/app/dist
EXPOSE 8080
CMD [ "npm", "start" ]