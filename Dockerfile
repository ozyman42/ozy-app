FROM alpine:3.7 as redsocks_binary
RUN apk update && apk add build-base curl libevent-dev iptables-dev bash ca-certificates \
  && curl -fsSL https://github.com/darkk/redsocks/archive/release-0.5.tar.gz | tar xz \
  && make -C redsocks-release-0.5/
# Maybe try https://github.com/tailscale/tailscale/blob/main/Dockerfile
FROM tailscale/tailscale:stable as tailscale_binary
FROM envoyproxy/envoy-alpine:v1.21.6 as envoy_binary
FROM node:alpine3.18
RUN corepack prepare pnpm@8.7.1 --activate
RUN corepack enable
COPY --from=redsocks_binary /lib/ld-musl-x86_64.so.1 /lib/ld-musl-x86_64.so.1
COPY --from=redsocks_binary /usr/lib/libevent_core-2.1.so.6 /usr/lib/libevent_core-2.1.so.6
COPY --from=redsocks_binary /redsocks-release-0.5/redsocks /usr/local/bin/redsocks
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
# https://www.reddit.com/r/Tailscale/comments/11hbe1n/install_tailscale_as_a_container_vs_on_host_for/jb0oyzp/?context=3
ENV TS_STATE_DIR /tmp/tsd-state
RUN pnpm next build
CMD ["node", "../../scripts/start.js"]
