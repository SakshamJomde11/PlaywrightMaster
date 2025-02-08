# Use Playwright base image (latest recommended version)
FROM mcr.microsoft.com/playwright:v1.50.1-jammy

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

# Set entrypoint (default command)
ENTRYPOINT ["npx", "playwright", "test"]
