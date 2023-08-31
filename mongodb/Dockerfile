FROM mongo:latest

WORKDIR /app

RUN mkdir mongodb-data

COPY mongodb-data ./mongodb-data
COPY ./*.deb .

COPY initDB.sh /docker-entrypoint-initdb.d

RUN chmod +x /docker-entrypoint-initdb.d/initDB.sh
RUN apt install ./mongodb-database-tools-ubuntu2204-x86_64-100.8.0.deb 

CMD ["mongod"]
