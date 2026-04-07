import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext';
import './index.css';

async function prepare() {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const { worker } = await import('@/mocks/browser');
    return worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
    });
  }
}
const queryClient = new QueryClient();
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/react-query').QueryClient;
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </HashRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
});

window.__TANSTACK_QUERY_CLIENT__ = queryClient;
