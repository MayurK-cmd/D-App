// import { ed25519 } from "@noble/curves/ed25519.js";
// import { useWallet} from "@solana/wallet-adapter-react";
// import { PublicKey } from "@solana/web3.js";
// import bs58 from 'bs58';
// import React from "react";

// export function SignMessage() {
//     const {publicKey, SignMessage} = useWallet();

//     async function onClick(){
//         if(!PublicKey) throw new Error('your Wallet is not connected!');
//         if(!SignMessage) throw new Error('signing message is not allowed');
        
//         const message=document.getElementById("message").value;
//         const encodedMessage = new TextEncoder().encode(message);
//         const signature = await SignMessage(encodedMessage);

//         if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
//         alert('success', `Message signature: ${bs58.encode(signature)}`);
//     };

//     return(
//         <div className="bg-black border-2 border-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-4 text-white">Sign Message</h2>
//             <div className="space-y-4">
//                 <input 
//                     id="message" 
//                     type="text" 
//                     placeholder="Type a message to sign"
//                     className="w-full px-4 py-3 border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-900 text-white placeholder-gray-500"
//                 />
//                 <button 
//                     onClick={onClick}
//                     className="w-full bg-white text-black font-semibold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors duration-200 active:bg-gray-300 border-2 border-white"
//                 >
//                     Sign Message
//                 </button>
//             </div>
//         </div>
//     );
// };



import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react"; // Handles wallet connection
import bs58 from 'bs58';
import { ed25519 } from "@noble/curves/ed25519.js";
import { getUtf8Encoder, getBase58Decoder } from "@solana/kit"; // For signing messages if needed

export function SignMessage() {
  const { publicKey, signMessage, wallet, connected } = useWallet(); // Using wallet-adapter-react
  const [message, setMessage] = useState(""); // Manage message input state
  const [signature, setSignature] = useState("");
  const [verified, setVerified] = useState(null);

  async function onClick() {
    if (!connected) {
      alert("Wallet is not connected!");
      return;
    }

    if (!publicKey) {
      alert("Public key is not available!");
      return;
    }

    const encodedMessage = getUtf8Encoder().encode(message);

    // Check if the connected wallet supports message signing
    try {
      let signedBytes;
      
      // If the wallet is Phantom (or Backpack)
      if (wallet.name === "Phantom" || wallet.name === "Backpack") {
        // Phantom and Backpack support signMessage API
        signedBytes = await signMessage(encodedMessage);
      } else {
        throw new Error("This wallet doesn't support message signing!");
      }

      // Verify signature (optional, if you want to verify in your app)
      if (!ed25519.verify(signedBytes, encodedMessage, publicKey.toBytes())) {
        throw new Error("Message signature is invalid!");
      }

      const decoded = getBase58Decoder().decode(signedBytes);
      setSignature(bs58.encode(decoded));
      setVerified(true);
      alert(`Message signed successfully! Signature: ${bs58.encode(decoded)}`);
    } catch (error) {
      setVerified(false);
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div className="bg-black border-2 border-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Sign Message</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Type a message to sign"
          className="w-full px-4 py-3 border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-900 text-white placeholder-gray-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update state on input change
        />
        <button
          onClick={onClick}
          className="w-full bg-white text-black font-semibold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors duration-200 active:bg-gray-300 border-2 border-white"
        >
          Sign Message
        </button>

        {signature && <div className="mt-4 text-white">Signature: {signature}</div>}
        {verified !== null && (
          <div className="mt-4 text-white">
            Verified: {verified ? "Yes" : "No"}
          </div>
        )}
      </div>
    </div>
  );
}
