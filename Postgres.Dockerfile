#docker build --file Postgres.Dockerfile "." -t postgreimage
# docker run -e POSTGRES_PASSWORD=password -d --name postgrecontainer postgreimage
FROM postgres:17

WORKDIR /datas

COPY ./data/create_db.sql /docker-entrypoint-initdb.d/01.sql
COPY ./data/create_tables.sql /docker-entrypoint-initdb.d/02.sql
COPY ./data/seeding_v1.sql /docker-entrypoint-initdb.d/03.sql


