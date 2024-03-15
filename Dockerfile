FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs . .

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
