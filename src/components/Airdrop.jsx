import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function Airdrop(){
    const wallet = useWallet();
    const {connection } = useConnection();

    async function SendAirdropToUser(){
        const amount = document.getElementById("publicKey").value
        await connection.requestAirdrop(wallet.publicKey, amount*1000000000)
        alert ("sol airdropped successfully")
    }

    return (
        <div className="h-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl transition-all group-hover:bg-cyan-500/20"></div>
            
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="text-cyan-400">💧</span> Request Airdrop
            </h2>
            
            <div className="space-y-5">
                <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Amount (SOL)</label>
                    <input 
                        id="publicKey" 
                        type="text" 
                        placeholder="e.g. 2"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                </div>
                
                <button 
                    onClick={SendAirdropToUser}
                    disabled={!wallet.connected}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-cyan-900/20 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Confirm Airdrop
                </button>
            </div>
        </div>
    )
}