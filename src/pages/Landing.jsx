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


export default function Landing(){
    return(
         <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
                            {/* Header with wallet buttons */}
                            <header className="bg-black border-b-4 border-white shadow-lg">
                                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-3xl font-bold text-white">
                                            Solana Wallet Manager
                                        </h1>
                                        <div className="flex gap-4">
                                            <Link to="/LaunchPad"
                                             className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] cursor-pointer"
                                            >Launch a token
                                            </Link>
                                            <WalletMultiButton className="!bg-white !text-black hover:!bg-gray-200 !font-semibold !rounded-lg !px-6 !py-3 !transition-all !duration-200 !border-2 !border-white" />
                                            <WalletDisconnectButton className="!bg-gray-800 !text-white hover:!bg-gray-700 !font-semibold !rounded-lg !px-6 !py-3 !transition-all !duration-200 !border-2 !border-gray-600" />
                                        </div>
                                    </div>
                                </div>
                            </header>
        
                            {/* Main content */}
                            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Balance Card */}
                                    <div className="md:col-span-2">
                                        <ShowBalance />
                                    </div>
        
                                    {/* Airdrop Card */}
                                    <div>
                                        <Airdrop />
                                    </div>
        
                                    {/* Send Tokens Card */}
                                    <div>
                                        <SendTokens />
                                    </div>
        
                                    {/* Sign Message Card - Full Width */}
                                    <div className="md:col-span-2">
                                        <SignMessage />
                                    </div>
                                </div>
                            </main>
        
                            {/* Footer */}
                            <footer className="bg-black border-t-4 border-white mt-12">
                                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                                    <p className="text-center text-gray-400 text-sm">
                                        Solana Devnet • Wallet Manager App
                                    </p>
                                </div>
                            </footer>
                        </div>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
    )
}