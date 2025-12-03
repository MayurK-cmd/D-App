import { http, createConfig, useAccount, useDisconnect, useBalance, useConnect, useSendTransaction } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { WagmiProvider } from 'wagmi';
import { parseEther } from 'viem';
import React, { useState } from 'react';
import { ETHBalance } from '../eth-comp/ShowETHBalance';
import { ETHWalletConnector } from '../eth-comp/ConnectWallet';
import { EthSend } from '../eth-comp/SendEth';
import '../index.css';
import '../App.css';
import { Link } from 'react-router-dom';

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
            <div>
                 <Link to="/"> go back</Link>
            </div>
            <br></br>
                <ETHWalletConnector />
                <ETHBalance />
                <EthSend />
            </QueryClientProvider>
        </WagmiProvider>
    );
}