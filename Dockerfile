# Use the latest Playwright image
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies first for better caching
COPY package.json package-lock.json ./
RUN npm install

# Install Playwright with dependencies
RUN npx playwright install --with-deps

# Copy the rest of the project files
COPY . .

# Set entrypoint for running tests
CMD ["npx", "playwright", "test"]
