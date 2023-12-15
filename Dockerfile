# Maybe try https://github.com/tailscale/tailscale/blob/main/Dockerfile
FROM tailscale/tailscale:stable as tailscale_binary
FROM envoyproxy/envoy-alpine:v1.21.6 as envoy_binary
FROM node:alpine3.18
RUN corepack prepare pnpm@8.7.1 --activate
RUN corepack enable
COPY --from=tailscale_binary /usr/local/bin /usr/local/bin
COPY --from=envoy_binary /usr/local/bin/envoy /usr/local/bin/envoy
COPY --from=envoy_binary /lib/ld-linux-x86-64.so.2 /lib/ld-linux-x86-64.so.2
COPY --from=envoy_binary /lib64/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2
COPY --from=envoy_binary /usr/glibc-compat /usr/glibc-compat
RUN mkdir -p /home/ozy/app
WORKDIR /home/ozy/app
COPY . .
RUN pnpm install
WORKDIR /home/ozy/app/packages/app
RUN echo "APP_VERSION=prod" > .env.local
RUN pnpm next build
CMD ["node", "../../scripts/start.js"]
