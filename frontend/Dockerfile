# Stage 1: Dependencies
FROM node:24-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev && \
    npm cache clean --force

# Stage 2: Builder
FROM node:24-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev)
RUN npm ci && \
    npm cache clean --force

# Copy source files
COPY . .

# Set reasonable memory limit for build (1GB should be enough without Sentry)
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from previous stages
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]