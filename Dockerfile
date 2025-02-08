# Use the Playwright base image
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy files and install dependencies
COPY package*.json ./
COPY playwright.config.ts ./
RUN npm ci
RUN npx playwright install --with-deps

# Copy the rest of the project
COPY . .

# Run Playwright tests
CMD ["bash", "-c", "npx playwright test"]