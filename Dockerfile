FROM node:14-buster

WORKDIR /app

USER 1000

EXPOSE 3000

CMD [ "yarn", "start" ]
