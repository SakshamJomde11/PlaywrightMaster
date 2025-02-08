# Use the latest Playwright image
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies first
RUN npm install

# Install Playwright with dependencies
RUN npx playwright install --with-deps

# Copy the rest of the project files
COPY . .

# Check if Playwright is installed properly
RUN ls -la node_modules/.bin/ # Check if Playwright binary exists
RUN npx playwright --version

# Default command
CMD ["npx", "playwright", "--version"]
