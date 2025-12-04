import { useState } from 'react';
import { TokenCreation } from "../Token/TokenCreate";
import { Link } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { MintToken } from "../Token/MintToken";

// Import standard wallet adapter styles if you haven't globally
import '@solana/wallet-adapter-react-ui/styles.css';
import { NetworkStatusBar } from '../components/Network';

export default function TokenLaunchPad(){
    const [mintAddress, setMintAddress] = useState(null);

    return(
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
                <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30 flex flex-col">
                    
                    {/* Header: Glassmorphism & Sticky */}
                    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-purple-900/5">
                        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg animate-pulse"></div>
                                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                        Solana Launchpad
                                    </h1>
                                </div>
                                
                                <div className="flex flex-wrap justify-center gap-3">
                                    <Link to="/solana"
                                        className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium text-sm transition-all transform hover:scale-105 border border-slate-700 hover:border-slate-600"
                                    >
                                        ← Go Back
                                    </Link>
                                    
                                    {/* Styled Wallet Buttons */}
                                    <div className="flex gap-2">
                                        <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !font-semibold !text-sm !h-[42px] !px-5 transition-all shadow-lg shadow-purple-900/20" />
                                        <WalletDisconnectButton className="!bg-slate-800 hover:!bg-red-900/80 !text-slate-200 !rounded-lg !font-semibold !text-sm !h-[42px] !px-4 border !border-slate-700" />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <NetworkStatusBar />
                    </header>

                    {/* Main Content Area */}
                    <main className="flex-grow relative">
                        {/* Background Decor */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative z-10 flex flex-col gap-12 py-12">
                            {/* Component Sections */}
                            <section>
                                <TokenCreation onTokenCreate={setMintAddress} />
                            </section>
                            
                            {mintAddress && (
                                <section className="animate-fade-in-up">
                                    <div className="max-w-4xl mx-auto px-4">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                                            <span className="text-slate-500 text-sm uppercase tracking-widest font-bold">Next Step</span>
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                                        </div>
                                    </div>
                                    <MintToken mintAddress={mintAddress} onDone={() => console.log("Minting complete")} />
                                </section>
                            )}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="bg-slate-900 border-t border-slate-800 mt-auto relative z-20">
                        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-slate-500 text-sm">
                                    © 2024 Solana Wallet Manager. Running on <span className="text-purple-400 font-semibold">Devnet</span>.
                                </p>
                                <div className="flex gap-6 text-slate-500 text-sm">
                                    <span className="hover:text-cyan-400 cursor-pointer transition-colors">Documentation</span>
                                    <span className="hover:text-cyan-400 cursor-pointer transition-colors">Support</span>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
    )
}