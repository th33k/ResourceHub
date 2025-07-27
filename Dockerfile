FROM ubuntu:22.04

# --- 1. Install system dependencies ---
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    openjdk-21-jdk \
    gnupg \
    ca-certificates && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# --- 2. Install Node.js (latest LTS v22.x) ---
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# --- 3. Install Ballerina ---
RUN curl -L https://dist.ballerina.io/downloads/2201.12.0/ballerina-2201.12.0-swan-lake.zip -o ballerina.zip && \
    unzip ballerina.zip -d /opt && \
    rm ballerina.zip && \
    chmod +x /opt/ballerina-2201.12.0-swan-lake/bin/bal
ENV PATH="/opt/ballerina-2201.12.0-swan-lake/bin:${PATH}"
ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64

# --- 4. Create non-root user before copying files ---
RUN useradd -u 10001 -m resourcehub

# --- 5. Set working directory and copy code ---
WORKDIR /app
COPY Back-End /app/Back-End
COPY Front-End /app/Front-End

# --- 6. Give ownership to the non-root user ---
RUN chown -R resourcehub:resourcehub /app

# --- 7. Switch to non-root user ---
USER resourcehub

# --- 8. Build backend (Ballerina) ---
WORKDIR /app/Back-End
RUN bal build

# --- 9. Build frontend (React/Vite) ---
WORKDIR /app/Front-End
RUN npm install && npm run build

# --- 10. Expose ports ---
EXPOSE 80 9090-9094

# --- 11. Run both backend and frontend ---
WORKDIR /app
CMD ["sh", "-c", "java -jar /app/Back-End/target/bin/ResourceHub.jar & npx serve -s /app/Front-End/dist -l 80"]
