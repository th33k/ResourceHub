FROM ballerina/ballerina:latest

WORKDIR /app

COPY . .

USER root
RUN bal build

EXPOSE 9090

USER ballerina

CMD ["bal", "run", "target/bin/ResourceHub.jar"]
