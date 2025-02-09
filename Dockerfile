# Use official Playwright image with all browsers
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./
COPY playwright.config.ts ./

# Install dependencies
RUN npm ci

# Install browsers
RUN npx playwright install --with-deps

# Copy all files
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]