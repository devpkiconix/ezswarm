# docker-node-bootstrap
A simple dockerized node app that allows you to load code from an external git repository.

# Build

# Docker build
```
$ docker build -t ezswarm/ezswarm:latest .
```

# Docker compose

See `docker-compose.yml`. With this config, when you run
`docker-compose up`, the git repo is pulled and the "bin/server"
script is executed.

# Swarm

TBD
