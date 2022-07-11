FROM node:17
WORKDIR /app
COPY package.json .
ARG NODE_ENV \
    PORT
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm install pm2 -g  && npm install --omit=dev\
    else npm install; \
    fi
COPY . ./
EXPOSE $PORT

