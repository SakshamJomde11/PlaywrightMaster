# Use Playwright base image (latest recommended version)
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package.json package-lock.json ./

# Install dependencies (including Playwright)
RUN npm ci

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy the rest of the project files
COPY . .

# Set entrypoint (use playwright directly, not npx)
CMD ["npx", "playwright", "test"]