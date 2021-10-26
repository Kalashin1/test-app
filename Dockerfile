FROM node:14

WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i
# If you are building your code for production

COPY . .

ENV PORT=4200

EXPOSE 4200

CMD [ "npm", "run", "serve" ]
