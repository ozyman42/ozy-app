FROM node:20.5-bookworm-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . .
CMD ["pnpm", "app:dev"]
