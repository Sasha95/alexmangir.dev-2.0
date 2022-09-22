import 'styles/codeblocks.css';
import 'styles/globals.css';

import { useSupabase } from '@/hooks/useSupabase';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const { session, supabaseClient } = useSupabase();
  return (
    <PlausibleProvider domain="alexmangir.dev" trackOutboundLinks={true}>
      <ThemeProvider attribute="class">
        <Component session={session} supabase={supabaseClient} {...pageProps} />
      </ThemeProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
