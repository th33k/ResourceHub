# Dockerfile for ResourceHub
FROM ubuntu:22.04

# Update OS packages and install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    nodejs \
    npm \
    openjdk-21-jdk && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
RUN java -version && \
    echo "JAVA_HOME is set to $JAVA_HOME"

# Download and extract Ballerina SDK
RUN curl -L https://dist.ballerina.io/downloads/2201.12.0/ballerina-2201.12.0-swan-lake.zip -o ballerina.zip && \
    unzip -t ballerina.zip && \
    unzip ballerina.zip -d /opt && \
    rm ballerina.zip && \
    chmod +x /opt/ballerina-2201.12.0-swan-lake/bin/bal && \
    /opt/ballerina-2201.12.0-swan-lake/bin/bal version
ENV PATH="/opt/ballerina-2201.12.0-swan-lake/bin:${PATH}"

# Build the backend
WORKDIR /app/Back-End
COPY Back-End /app/Back-End
RUN bal build

# Build the frontend
WORKDIR /app/Front-End
COPY Front-End /app/Front-End
RUN npm install && npm run build

# Port configuration
EXPOSE 80 9090-9094

# Create a non-root user and switch to it
RUN useradd -u 10001 -m resourcehub
USER 10001

# Prepare the final image
WORKDIR /app
CMD ["sh", "-c", "java -jar /app/Back-End/target/bin/ResourceHub.jar & npx serve -s /app/Front-End/build -l 80"]