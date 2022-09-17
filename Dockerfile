FROM node:17
WORKDIR /app
COPY package.json .
ARG NODE_ENV \
    PORT
RUN if [ "$NODE_ENV" = "development" ]; \
    then  npm install; \
    fi
COPY . ./
EXPOSE $PORT

