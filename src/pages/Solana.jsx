import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
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


// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';
import { NetworkStatusBar } from '../components/Network';


export default function Solana(){
    return(
         <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30">
                            
                            {/* Header: Glassmorphism & Sticky */}
                            <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-purple-900/5">
                                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-xl shadow-lg shadow-purple-500/20"></div>
                                            <h1 className="text-2xl font-bold tracking-tight text-white">
                                                Solana <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Manager</span>
                                            </h1>
                                        </div>
                                        
                                        <div className="flex flex-wrap justify-center gap-3">
                                            <Link to="/sol/launch-a-token"
                                                className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg font-semibold text-sm transition-all transform hover:scale-105 shadow-lg shadow-purple-900/20"
                                            >
                                                🚀 Launch Token
                                            </Link>
                                             <Link to="/"
                                                className="inline-flex items-center justify-center px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium text-sm transition-colors border border-slate-700"
                                            >
                                                Back
                                            </Link>
                                            <WalletMultiButton className="!bg-slate-800 hover:!bg-slate-700 !text-white !font-semibold !rounded-lg !h-[40px] !px-4 !border !border-slate-600 !transition-all" />
                                            <WalletDisconnectButton className="!bg-red-900/20 hover:!bg-red-900/40 !text-red-400 !font-semibold !rounded-lg !h-[40px] !px-4 !border !border-red-900/50 !transition-all" />
                                            
                                        </div>
                                    </div>
                                </div>
                                <NetworkStatusBar />
                            </header>
        
                            {/* Main content */}
                            <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
                                {/* Background Glows */}
                                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                                    <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
                                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                                    {/* Balance Card - Spans full width on mobile, 2 cols on desktop */}
                                    <div className="lg:col-span-2 transform transition-all hover:scale-[1.01]">
                                        <ShowBalance />
                                    </div>
        
                                    {/* Airdrop Card */}
                                    <div className="h-full">
                                        <Airdrop />
                                    </div>
        
                                    {/* Send Tokens Card */}
                                    <div className="h-full">
                                        <SendTokens />
                                    </div>
        
                                    {/* Sign Message Card - Full Width */}
                                    <div className="lg:col-span-2">
                                        <SignMessage />
                                    </div>
                                </div>
                            </main>
        
                            {/* Footer */}
                            <footer className="bg-slate-900 border-t border-slate-800 mt-12 py-8">
                                <div className="max-w-7xl mx-auto px-4 text-center">
                                    <p className="text-slate-500 text-sm">
                                        Solana Devnet • <span className="text-purple-400">Wallet Manager App</span>
                                    </p>
                                </div>
                            </footer>
                        </div>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
    )
}