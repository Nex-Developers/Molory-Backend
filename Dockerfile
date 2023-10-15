FROM node:17
WORKDIR /app
COPY package.json .
ARG NODE_ENV \
    PORT
ENV NODE_ENV $NODE_ENV
RUN npm install
COPY . ./
EXPOSE $PORT
