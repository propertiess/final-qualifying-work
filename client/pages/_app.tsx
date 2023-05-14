import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

export const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.documentElement.style.opacity = '1';
  }, []);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      // theme={{ colorScheme: 'dark' }}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
