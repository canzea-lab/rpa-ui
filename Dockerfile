FROM node:10-slim

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

RUN npm install -g serve

# Bundle app source
COPY public public
COPY src src

RUN npm run build

EXPOSE 5000

CMD [ "-s", "build" ]
ENTRYPOINT [ "serve" ]
