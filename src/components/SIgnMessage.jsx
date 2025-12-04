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
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
             <span className="text-emerald-400 text-xl">✍️</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Sign Message</h2>
      </div>

      <div className="space-y-5">
        <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Message to Sign</label>
            <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Update state on input change
            />
        </div>

        <button
          onClick={onClick}
          disabled={!connected}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-900/20 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign Message
        </button>

        {signature && (
            <div className="mt-6 bg-slate-950 border border-slate-800 rounded-xl p-4 animate-fade-in">
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Generated Signature:</p>
                <div className="font-mono text-xs text-emerald-400 break-all leading-relaxed">
                    {signature}
                </div>
            </div>
        )}
        
        {verified !== null && (
          <div className={`mt-2 flex items-center gap-2 text-sm font-medium ${verified ? 'text-green-400' : 'text-red-400'}`}>
            <span>{verified ? "✓" : "✗"}</span>
            <span>Signature Verified: {verified ? "Yes" : "No"}</span>
          </div>
        )}
      </div>
    </div>
  );
}