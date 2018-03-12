FROM node:alpine

COPY package.json /

RUN npm install

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

# set node environment to production after so that devDependencies are pulled
CMD ["npm", "start"]
