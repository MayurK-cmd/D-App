import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import { Airdrop } from '../components/Airdrop';
import { ShowBalance } from '../components/ShowBalance';
import { SignMessage } from '../components/SIgnMessage';
import { SendTokens } from '../components/SendSol';
import { NetworkStatusBar } from '../components/Network';

import '@solana/wallet-adapter-react-ui/styles.css';

export default function Solana() {
    const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30">

                        {/* Header */}
                        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-purple-900/5">
                            <div className="max-w-7xl mx-auto px-4 py-4">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                                    <h1 className="text-2xl font-bold text-white">
                                        Solana Manager
                                    </h1>

                                    <div className="flex flex-wrap gap-3 items-center">

                                        {/* Network Toggle */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setNetwork(WalletAdapterNetwork.Devnet)}
                                                className={`px-3 py-1 rounded ${network === WalletAdapterNetwork.Devnet ? "bg-purple-600" : "bg-slate-700"}`}
                                            >
                                                Devnet
                                            </button>

                                            <button
                                                onClick={() => setNetwork(WalletAdapterNetwork.Testnet)}
                                                className={`px-3 py-1 rounded ${network === WalletAdapterNetwork.Testnet ? "bg-purple-600" : "bg-slate-700"}`}
                                            >
                                                Testnet
                                            </button>

                                            <button
                                                onClick={() => setNetwork(WalletAdapterNetwork.Mainnet)}
                                                className={`px-3 py-1 rounded ${network === WalletAdapterNetwork.MainnetBeta ? "bg-purple-600" : "bg-slate-700"}`}
                                            >
                                                Mainnet
                                            </button>
                                        </div>

                                        <Link to="/sol/launch-a-token" className="px-4 py-2 bg-purple-600 rounded text-white">
                                            🚀 Launch Token
                                        </Link>

                                        <Link to="/" className="px-4 py-2 bg-slate-800 rounded">
                                            Back
                                        </Link>

                                        <WalletMultiButton />
                                        <WalletDisconnectButton />
                                    </div>
                                </div>
                            </div>

                            <NetworkStatusBar />
                        </header>

                        {/* Main */}
                        <main className="max-w-7xl mx-auto px-4 py-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                <div className="lg:col-span-2">
                                    <ShowBalance network={network} />
                                </div>

                                <Airdrop network={network} />
                                <SendTokens network={network} />

                                <div className="lg:col-span-2">
                                    <SignMessage />
                                </div>

                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="text-center py-6 text-slate-500">
                            Network: {network.replace("mainnet-beta", "Mainnet")}
                        </footer>

                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}