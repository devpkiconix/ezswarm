FROM node:0.10-onbuild

RUN apt-get install -y git

RUN mkdir -p /usr/src/app/realapp

#RUN mkdir -p /usr/src/app/bootstrap
#WORKDIR /usr/src/app/bootstrap

EXPOSE 3000
EXPOSE 8443
EXPOSE 23124

CMD [ "npm", "start" ]
