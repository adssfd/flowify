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

# Production stage - use nginx:alpine as base
FROM nginx:alpine

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set permissions for the nginx directory (using default nginx user)
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Ensure config file has correct permissions
RUN chown nginx:nginx /etc/nginx/nginx.conf && \
    chmod 644 /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Use the default nginx entrypoint and command
CMD ["nginx", "-g", "daemon off;"]