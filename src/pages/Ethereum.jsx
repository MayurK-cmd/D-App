import { http, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { WagmiProvider } from 'wagmi';
import React from 'react';
import { ETHBalance } from '../eth-comp/ShowETHBalance';
import { ETHWalletConnector } from '../eth-comp/ConnectWallet';
import { EthSend } from '../eth-comp/SendEth';

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

export default function Ethereum() {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-6">
                            <a 
                                href="/" 
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Go Back
                            </a>
                        </div>
                        
                        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                            Ethereum Wallet
                        </h1>
                        
                        <ETHWalletConnector />
                        <ETHBalance />
                        <EthSend />
                    </div>
                </div>
            </QueryClientProvider>
        </WagmiProvider>
    );
}