FROM node:22-alpine

ENV NEXT_PUBLIC_CATALOG_SERVICE_URL=http://ecommerce-catalog-service.ecommerce-catalog-service
ENV NEXT_PUBLIC_ORDER_SERVICE_URL=http://localhost:3002

EXPOSE 3000
RUN apk update && apk add curl bash libc6-compat && rm -rf /var/cache/apk/*

WORKDIR /app

COPY . /app

# Install dependencies
RUN rm -f package-lock.json
RUN npm install --legacy-peer-deps

# Build application
RUN npm run build

# Disable telemetry
RUN npx next telemetry disable

# Run app
CMD ["npm", "start"]
