# Use the Playwright base image
FROM mcr.microsoft.com/playwright:v1.42.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy files and run commands
COPY package*.json ./
COPY playwright.config.ts ./
RUN npm ci
COPY . .
CMD ["npx", "playwright", "test"]