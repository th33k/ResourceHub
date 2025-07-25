# Dockerfile for ResourceHub
FROM ubuntu:22.04

# Update OS packages and install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    nodejs \
    npm \
    openjdk-11-jre

# Download and extract Ballerina SDK
RUN curl -L https://github.com/ballerina-platform/ballerina-lang/releases/download/v2201.12.7/ballerina-2201.12.7-swan-lake.zip -o ballerina.zip && \
    unzip ballerina.zip -d /opt/ballerina && \
    rm ballerina.zip
ENV PATH="/opt/ballerina/bin:${PATH}"

# Build the backend
WORKDIR /app/Back-End
COPY Back-End /app/Back-End
RUN bal build

# Build the frontend
WORKDIR /app/Front-End
COPY Front-End /app/Front-End
RUN npm install && npm run build

# Port configuration
EXPOSE 9090 9091 9092 9093 9094 80

# Create a non-root user and switch to it
RUN useradd -u 10014 -m resourcehub
USER resourcehub

# Prepare the final image
WORKDIR /app
CMD ["sh", "-c", "java -jar /app/Back-End/target/bin/ResourceHub.jar & npx serve -s /app/Front-End/build -l 80"]
