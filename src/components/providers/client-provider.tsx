//@ts-nocheck



"use client"
import '@rainbow-me/rainbowkit/styles.css';

import * as React from "react"
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  import {
    getDefaultConfig,
    RainbowKitProvider,
  } from '@rainbow-me/rainbowkit';
  import { WagmiProvider } from 'wagmi';
  import {
    moonbaseAlpha,
    moonbeam,
    moonriver
  } from 'wagmi/chains';
import { SessionProvider } from 'next-auth/react';
  const queryClient  =  new QueryClient
  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: walletConnectProjectId,
    chains: [moonbaseAlpha, moonbeam, moonriver],
    ssr: false, // If your dApp uses server side rendering (SSR)
  });
export function ClientProviders({ children}) {
  return (
    <WagmiProvider config={config}>
  <QueryClientProvider client={queryClient} >
    <RainbowKitProvider>
      <SessionProvider>
    {children}
    </SessionProvider>
    </RainbowKitProvider>
   </QueryClientProvider>
    </WagmiProvider>
)}
