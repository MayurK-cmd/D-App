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
        <div>
            {mintAddress && <p>Mint Address: {typeof mintAddress === 'string' ? mintAddress : mintAddress.toBase58()}</p>}
            <input 
                type="text" 
                placeholder="Enter mint amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={mint} disabled={!wallet.connected || !mintAddress}>
                {!wallet.connected ? "Connect Wallet First" : 
                 !mintAddress ? "Create Token First" : 
                 "Mint Token"}
            </button>
        </div>
    )
}