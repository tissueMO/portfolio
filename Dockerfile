FROM node:14-buster

WORKDIR /app

# Chromium インストール
RUN apt-get -y update \
 && apt-get -y install chromium \
 && apt-get -y autoremove

USER 1000

EXPOSE 3000

CMD [ "yarn", "start" ]
