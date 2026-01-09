# syntax=docker/dockerfile:1.7-labs

# Stage 1: Build
ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-alpine AS build

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy all package.json files
COPY package.json ./
COPY package-lock.json ./

# Copy patches folder
COPY ./patches ./patches

# Copy all package.json files from the web directories
COPY ./web/app/package.json ./web/app/package.json
COPY ./web/composer/package.json ./web/composer/package.json
COPY ./web/api/package.json ./web/api/package.json

# Install all dependencies (including dev dependencies)
RUN --mount=type=cache,target=/root/.npm npm install

# Copy the rest of the project files and run the build
COPY . .

RUN npm run build

# Stage 2: Production
FROM node:${NODE_VERSION}-alpine AS production

# Install build dependencies for native modules (needed for better-sqlite3)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app ./

# Install only production dependencies
RUN --mount=type=cache,target=/root/.npm npm install --omit=dev

# Listen to all network interfaces
ENV HOST=0.0.0.0

# Set the port to 3042
ENV PORT=3042

# Expose the port
EXPOSE 3042

# Start the application
CMD npm run start
