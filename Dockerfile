# Use the official Playwright image as the base
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# Install Node.js dependencies (this includes Playwright if it's in package.json)
RUN npm install

# Copy the rest of the project files
COPY . .

# Ensure Playwright is installed inside the image
RUN npx playwright install --with-deps

# Set default command (optional)
CMD ["npx", "playwright", "test"]