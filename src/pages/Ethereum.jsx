import { http, createConfig, useAccount, useDisconnect, useBalance, useConnect, useSendTransaction } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { WagmiProvider } from 'wagmi';
import { parseEther } from 'viem';
import React, { useState } from 'react';
import '../index.css';
import '../App.css';

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

function WalletConnector() {
    const { connectors, connect, error } = useConnect();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect(); // Add disconnect hook

    return (
        <div>
            {!isConnected ? (
                <>
                    {connectors.map((connector) => (
                        <button key={connector.uid} onClick={() => connect({ connector })}>
                            Connect with {connector.name}
                        </button>
                    ))}
                </>
            ) : (
                <button onClick={() => disconnect()}>
                    Disconnect Wallet
                </button>
            )}
            
            {isConnected && <p>Connected</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}

function EthSend() {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const { data: hash, isPending, isSuccess, isError, error, sendTransaction } = useSendTransaction();

    const handleSend = () => {
        if (!address || !amount) {
            alert('Please enter both address and amount');
            return;
        }

        try {
            sendTransaction({
                to: address,
                value: parseEther(amount)
            });
        } catch (err) {
            console.error('Error sending transaction:', err);
        }
    };

    return (
        <div>
            <br></br>
            <h3>Send ETH</h3>
            <input 
                type="text" 
                placeholder="Recipient Address (0x...)" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
            />
            <br></br>
            <input 
                type="text" 
                placeholder="Amount in ETH (e.g., 0.1)" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />
            <br></br>
            <button onClick={handleSend} disabled={isPending}>
                {isPending ? 'Sending...' : 'Send ETH'}
            </button>

            {isSuccess && (
                <div>
                    <p>Transaction sent successfully!</p>
                    <p>Hash: {hash}</p>
                </div>
            )}
            {isError && <p>Error: {error?.message}</p>}
        </div>
    );
}

function MyAddress() {
    const { address } = useAccount();
    const { data: balanceData } = useBalance({ address });

    return (
        <div>
            {address ? (
                <>
                    <p>Address: {address}</p>
                    <br></br>
                    <p>Balance: {balanceData?.formatted} {balanceData?.symbol}</p>
                </>
            ) : (
                <p>No wallet connected</p>
            )}
        </div>
    );
}

export default function Ethereum() {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <WalletConnector />
                <MyAddress />
                <EthSend />
            </QueryClientProvider>
        </WagmiProvider>
    );
}