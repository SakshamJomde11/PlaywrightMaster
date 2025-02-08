# Use Playwright base image
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

# Set working directory inside container
WORKDIR /app

# Ensure system dependencies are installed
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install npm dependencies (ensures Playwright is installed)
RUN npm ci
RUN npx playwright install --with-deps

# Copy all other files
COPY . .

# Default command (optional)
CMD ["npx", "playwright", "test"]