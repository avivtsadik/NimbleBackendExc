FROM node:latest

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install && apt-get update && apt-get install -y net-tools dnsutils

# Copy entrypoint script
COPY entry.sh /entry.sh
RUN chmod +x /entry.sh

# Copy index.js file
COPY index.js ./index.js

# Expose port
EXPOSE 80

# Set entrypoint script
ENTRYPOINT ["/entry.sh"]
