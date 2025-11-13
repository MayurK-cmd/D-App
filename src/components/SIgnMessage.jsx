import { ed25519 } from "@noble/curves/ed25519.js";
import { useWallet} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import bs58 from 'bs58';
import React from "react";

export function SignMessage() {
    const {publicKey, SignMessage} = useWallet();

    async function onClick(){
        if(!PublicKey) throw new Error('your Wallet is not connected!');
        if(!SignMessage) throw new Error('signing message is not allowed');
        
        const message=document.getElementById("message").value;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await SignMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('success', `Message signature: ${bs58.encode(signature)}`);
    };

    return(
        <div className="bg-black border-2 border-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Sign Message</h2>
            <div className="space-y-4">
                <input 
                    id="message" 
                    type="text" 
                    placeholder="Type a message to sign"
                    className="w-full px-4 py-3 border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-900 text-white placeholder-gray-500"
                />
                <button 
                    onClick={onClick}
                    className="w-full bg-white text-black font-semibold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors duration-200 active:bg-gray-300 border-2 border-white"
                >
                    Sign Message
                </button>
            </div>
        </div>
    );
};