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
        <div className="bg-gray-900 border-2 border-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Send SOL</h2>
            <div className="space-y-4">
                <input 
                    id="to" 
                    type="text" 
                    placeholder="Recipient Address"
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-gray-800 text-white placeholder-gray-400"
                />
                <input 
                    id="amount" 
                    type="text" 
                    placeholder="Amount (SOL)"
                    className="w-full px-4 py-3 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-gray-800 text-white placeholder-gray-400"
                />
                <button 
                    onClick={sendTokens}
                    className="w-full bg-white text-black font-semibold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors duration-200 active:bg-gray-300"
                >
                    Send Tokens
                </button>
            </div>
        </div>
    )
}