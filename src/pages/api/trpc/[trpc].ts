import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import superjson from 'superjson';
import crypto from 'crypto';
import prisma from '../../../utils/prismaClient';

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .mutation('slug.create', {
    input: z.object({
      url: z.string(),
    }),
    async resolve({ input }) {
      const slug = crypto.randomBytes(6).toString('hex');

      await prisma.slug.create({
        data: {
          url: input.url,
          slug,
        },
      });

      return {
        message: `link shortified with success`,
        slug,
      };
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
