docker build -t java-app .
docker tag java-app:latest adityajoshi12/service-b:1.0

docker push adityajoshi12/service-b:1.0