FROM openjdk:17

WORKDIR /usr/app

COPY target/service-B-0.0.1-SNAPSHOT.jar app.jar
COPY opentelemetry-javaagent.jar /opentelemetry-javaagent-all.jar
CMD ["java","-javaagent:/opentelemetry-javaagent-all.jar","-jar","app.jar"]