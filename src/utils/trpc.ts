import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../pages/api/trpc/[trpc]';

const trpc = createReactQueryHooks<AppRouter>();

export default trpc;
