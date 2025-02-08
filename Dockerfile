FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install Playwright with dependencies
RUN npx playwright install --with-deps

# Copy the rest of the project files
COPY . .

# Check if Playwright is installed properly
RUN npx playwright --version

# Default command
CMD ["npx", "playwright", "--version"]
