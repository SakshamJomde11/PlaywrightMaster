# Use Playwright base image
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Ensure Playwright is installed along with dependencies
RUN npx playwright install --with-deps

# Copy all other files
COPY . .

# Default command
CMD ["npx", "playwright", "test"]