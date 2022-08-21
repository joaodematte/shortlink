import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AppRouter } from './api/trpc/[trpc]';
import getBaseUrl from '../utils/getBaseUrl';

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default withTRPC<AppRouter>({
  config() {
    return {
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
