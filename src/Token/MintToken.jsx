import { getAssociatedTokenAddressSync, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID, createMintToInstruction } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, PublicKey } from "@solana/web3.js";
import { useState } from "react";

export function MintToken({mintAddress, onDone}){
    const wallet = useWallet();
    const {connection} = useConnection();
    const [amount, setAmount] = useState('1000000000');
    

    async function mint() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        if (!mintAddress) {
            alert("Please create a token first!");
            return;
        }

        try {
            const mintPublicKey = typeof mintAddress === 'string' 
                ? new PublicKey(mintAddress) 
                : mintAddress;

            const associatedToken = getAssociatedTokenAddressSync(
                mintPublicKey,
                wallet.publicKey,
                false,
                TOKEN_PROGRAM_ID,
            );

            console.log(associatedToken.toBase58());

            const transaction = new Transaction().add(
                createAssociatedTokenAccountInstruction(
                    wallet.publicKey,
                    associatedToken,
                    wallet.publicKey,
                    mintPublicKey,
                    TOKEN_PROGRAM_ID,
                ),
            );

            await wallet.sendTransaction(transaction, connection);

            const mintTransaction = new Transaction().add(
                createMintToInstruction(
                    mintPublicKey, 
                    associatedToken, 
                    wallet.publicKey, 
                    parseInt(amount), 
                    [], 
                    TOKEN_PROGRAM_ID
                )
            );

            await wallet.sendTransaction(mintTransaction, connection);
            console.log("Minting done for token " + mintPublicKey.toBase58());
            alert("Tokens minted successfully!");
            if (onDone) onDone();
        } catch (error) {
            console.error("Minting error:", error);
            alert("Error minting tokens: " + error.message);
        }
    }

    return(
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-200 font-sans">
            <div className="w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 space-y-6 relative overflow-hidden">
                {/* Background Gradient Blob */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Header */}
                <div className="relative z-10 space-y-2">
                    <h2 className="text-2xl font-bold text-white">Mint Supply</h2>
                    <p className="text-sm text-slate-400">Mint additional tokens to your wallet</p>
                </div>

                {/* Mint Address Display */}
                {mintAddress && (
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 relative z-10">
                         <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Target Mint Address</label>
                         <div className="font-mono text-xs text-cyan-400 break-all bg-slate-950/50 p-2 rounded border border-slate-800">
                            {typeof mintAddress === 'string' ? mintAddress : mintAddress.toBase58()}
                         </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="space-y-4 relative z-10">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Amount to Mint</label>
                        <input 
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 font-mono" 
                            type="text" 
                            placeholder="Enter mint amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                         <p className="text-[10px] text-slate-500 mt-1">Raw amount (including decimals)</p>
                    </div>

                    {/* Button */}
                    <button 
                        onClick={mint} 
                        disabled={!wallet.connected || !mintAddress}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 
                            ${!wallet.connected || !mintAddress
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:scale-[1.02] hover:shadow-emerald-500/25 text-white'
                            }`}
                    >
                        {!wallet.connected ? "Connect Wallet First" : 
                         !mintAddress ? "Create Token First" : 
                         "✨ Mint Tokens"}
                    </button>
                </div>
            </div>
        </div>
    )
} 