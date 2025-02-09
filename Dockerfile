# Build stage
FROM mcr.microsoft.com/playwright:v1.50.0-jammy as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Final stage
FROM mcr.microsoft.com/playwright:v1.50.0-jammy
WORKDIR /app
COPY --from=builder /app .
CMD ["npx", "playwright", "test"]