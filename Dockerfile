FROM alpine:3.21 as gcc_binaries
RUN apk add build-base
# Maybe try https://github.com/tailscale/tailscale/blob/main/Dockerfile
FROM tailscale/tailscale:stable as tailscale_binary
FROM envoyproxy/envoy-alpine:v1.21.6 as envoy_binary
FROM python:3.10-alpine as python_binary
FROM node:alpine3.18
RUN corepack prepare pnpm@8.7.1 --activate
RUN corepack enable
COPY --from=gcc_binaries /usr/bin /usr/bin
COPY --from=gcc_binaries /usr/lib /usr/lib
COPY --from=gcc_binaries /usr/libexec /usr/libexec
COPY --from=python_binary /usr/local/lib /usr/local/lib
COPY --from=python_binary /usr/local/bin /usr/local/bin
COPY --from=python_binary /lib/ld-musl-x86_64.so.1 /lib/ld-musl-x86_64.so.1
COPY --from=tailscale_binary /usr/local/bin /usr/local/bin
COPY --from=envoy_binary /usr/local/bin/envoy /usr/local/bin/envoy
COPY --from=envoy_binary /lib/ld-linux-x86-64.so.2 /lib/ld-linux-x86-64.so.2
COPY --from=envoy_binary /lib64/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2
COPY --from=envoy_binary /usr/glibc-compat /usr/glibc-compat
RUN mkdir -p /home/ozy/app
WORKDIR /home/ozy/app
COPY . .
RUN echo "cache buster"
RUN which python3 && which python
RUN CI=1 pnpm install
WORKDIR /home/ozy/app/packages/app
RUN echo "APP_VERSION=prod" > .env.local
RUN pnpm next build
CMD ["node", "../../scripts/start.js"]
