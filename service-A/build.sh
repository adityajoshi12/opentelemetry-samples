docker build -t node-app .
docker tag node-app:latest adityajoshi12/service-a:1.0

docker push adityajoshi12/service-a:1.0