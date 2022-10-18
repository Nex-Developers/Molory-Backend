FROM node:17
WORKDIR /app
COPY package.json .
ARG NODE_ENV \
    PORT
RUN npm install
COPY . ./
EXPOSE $PORT

