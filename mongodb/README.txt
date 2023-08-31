docker build -t my-mongo .
docker run -d -p 27018:27017 --network ilive-network --name mongodb-container my-mongo
docker exec mongodb-container /app/start.sh