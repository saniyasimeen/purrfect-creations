FROM postgres:14 as purrfect-creations-backend
WORKDIR /app
COPY ./scripts/init.sh /docker-entrypoint-initdb.d
COPY ./scripts/dump.sql ./scripts/dump.sql