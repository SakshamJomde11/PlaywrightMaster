# Use Playwright base image
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install npm dependencies (ensures Playwright is installed)
RUN npm ci
RUN npx playwright install --with-deps

# Copy all other files
COPY . .

# Verify Playwright installation
RUN npx playwright --version

# Default command
CMD ["npx", "playwright", "test"]
