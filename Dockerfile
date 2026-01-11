# Multi-stage build process
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build-only

# Production stage
FROM nginx:alpine

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Create nginx user
RUN addgroup -g 101 -G nodejs && \
    adduser -D nodejs nodejs && \
    chown -R nodejs:nodejs /usr/share/nginx/html

# Expose port
EXPOSE 80

# Use the default nginx entrypoint and command
CMD ["nginx", "-g", "daemon off;"]