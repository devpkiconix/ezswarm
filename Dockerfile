FROM node:0.10

RUN apt-get install -y git

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 3000
EXPOSE 8443
EXPOSE 23124

RUN chmod +x /usr/src/app/bootstrap.sh
CMD ["/bin/bash", "./bootstrap.sh"]
