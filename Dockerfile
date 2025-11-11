# Use Node 18 Alpine base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs

# Copy package files first for layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code (with ownership)
COPY --chown=nodeuser:nodejs src ./src

# Install curl for healthcheck
RUN apk add --no-cache curl

# Switch to non-root user
USER nodeuser

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the app
CMD ["npm", "star"]
