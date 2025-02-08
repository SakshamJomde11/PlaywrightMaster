# Use the Playwright base image
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies, including Playwright
RUN npm ci

# Copy the rest of your project files
COPY . .

# Install Playwright Browsers
RUN npx playwright install --with-deps
