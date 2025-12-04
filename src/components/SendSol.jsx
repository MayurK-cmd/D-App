import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export function SendTokens(){
    const wallet = useWallet();
    const {connection} = useConnection();

    async function sendTokens(){
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;
        const transaction = new Transaction();
        transaction.add (SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    return(
        <div className="h-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl transition-all group-hover:bg-purple-500/20"></div>

            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="text-purple-400">💸</span> Send SOL
            </h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Recipient Address</label>
                    <input 
                        id="to" 
                        type="text" 
                        placeholder="Wallet Address"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                </div>
                
                <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Amount</label>
                    <input 
                        id="amount" 
                        type="text" 
                        placeholder="Amount (SOL)"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                </div>

                <button 
                    onClick={sendTokens}
                    disabled={!wallet.connected}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                    Send Transaction
                </button>
            </div>
        </div>
    )
}