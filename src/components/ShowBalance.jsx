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

    return <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-3 text-black">Wallet Balance</h2>
        <div className="bg-white border border-gray-300 rounded-md p-4">
            <p className="text-gray-600 text-sm mb-2">SOL Balance</p>
            <div 
                id="balance" 
                className="text-4xl font-bold text-black"
            >
                0.00
            </div>
            <p className="text-gray-500 text-xs mt-2">SOL</p>
        </div>
    </div>
}