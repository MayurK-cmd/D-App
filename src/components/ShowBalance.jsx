import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function ShowBalance(){
    const wallet = useWallet();
    const {connection} = useConnection();

    async function getBalance(){
        if(wallet.publicKey){
            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML=balance/ LAMPORTS_PER_SOL;
        }
    }

    getBalance();

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <h2 className="text-lg font-medium text-slate-400 mb-1">Total Balance</h2>
                    <div className="flex items-baseline gap-2">
                        <div 
                            id="balance" 
                            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight"
                        >
                            0.00
                        </div>
                        <span className="text-xl font-bold text-slate-500">SOL</span>
                    </div>
                </div>
                
                <div className="hidden sm:block p-3 bg-slate-950/50 rounded-xl border border-slate-700/50">
                     <span className="text-2xl">💰</span>
                </div>
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live on Devnet
            </div>
        </div>
    )
}