import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function Airdrop(){
    const wallet = useWallet();
    const {connection } = useConnection();

    async function SendAirdropToUser(){
        const amount = document.getElementById("publicKey").value
        await connection.requestAirdrop(wallet.publicKey, amount*1000000000)
        alert ("sol airdropped successfully")
    }

    return <div className="bg-white border-2 border-black p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-black">Request Airdrop</h2>
        <div className="space-y-4">
            <input 
                id="publicKey" 
                type="text" 
                placeholder="Amount"
                className="w-full px-4 py-3 border-2 border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 text-black placeholder-gray-500"
            />
            <button 
                onClick={SendAirdropToUser}
                className="w-full bg-black text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors duration-200 active:bg-gray-900"
            >
                Send Airdrop
            </button>
        </div>
    </div>
}