// TokenCreation_fixed.jsx
import React, { useState } from "react";
import {
  getMinimumBalanceForRentExemptMint,
  TOKEN_PROGRAM_ID,
  createInitializeMint2Instruction,
  MINT_SIZE,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToCheckedInstruction,
} from "@solana/spl-token";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Keypair, Transaction, PublicKey } from "@solana/web3.js";

// Try importing from @metaplex-foundation/mpl-token-metadata
// This should work with version 2.x
import * as mpl from "@metaplex-foundation/mpl-token-metadata";

// Metaplex Token Metadata Program ID
const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

/**
 * Build a Metaplex metadata creation instruction
 * This tries different API versions to maximize compatibility
 */
function buildCreateMetadataInstruction(mintPubkey, payerPubkey, authorityPubkey, metadataData) {
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mintPubkey.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  // Try V3 (mpl-token-metadata v2.x)
  if (typeof mpl.createCreateMetadataAccountV3Instruction === "function") {
    console.log("Using createCreateMetadataAccountV3Instruction");
    return mpl.createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint: mintPubkey,
        mintAuthority: authorityPubkey,
        payer: payerPubkey,
        updateAuthority: authorityPubkey,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name: metadataData.name,
            symbol: metadataData.symbol,
            uri: metadataData.uri,
            sellerFeeBasisPoints: metadataData.sellerFeeBasisPoints ?? 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: metadataData.isMutable ?? true,
          collectionDetails: null,
        },
      }
    );
  }

  // Try V2 (older versions)
  if (typeof mpl.createCreateMetadataAccountV2Instruction === "function") {
    console.log("Using createCreateMetadataAccountV2Instruction");
    return mpl.createCreateMetadataAccountV2Instruction(
      {
        metadata: metadataPDA,
        mint: mintPubkey,
        mintAuthority: authorityPubkey,
        payer: payerPubkey,
        updateAuthority: authorityPubkey,
      },
      {
        createMetadataAccountArgsV2: {
          data: {
            name: metadataData.name,
            symbol: metadataData.symbol,
            uri: metadataData.uri,
            sellerFeeBasisPoints: metadataData.sellerFeeBasisPoints ?? 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: metadataData.isMutable ?? true,
        },
      }
    );
  }

  // If neither work, show what's available
  console.error("Available mpl exports:", Object.keys(mpl));
  throw new Error(
    "No compatible createCreateMetadataAccount instruction found.\n\n" +
    "Please upgrade to a compatible version:\n" +
    "npm uninstall @metaplex-foundation/mpl-token-metadata\n" +
    "npm install @metaplex-foundation/mpl-token-metadata@2.13.0\n\n" +
    "Available exports: " + Object.keys(mpl).filter(k => k.includes('create')).join(", ")
  );
}

/**
 * TokenCreation component
 */
export function TokenCreation({ onTokenCreate }) {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [lastMint, setLastMint] = useState(null);

  // Replace with your Pinata CID or gateway URL if you prefer
  const PINATA_CID = "bafkreiffxwkl6sjjidwxmrr3i4pu6i7vnpelfn5gc3qw3nmmfu45njozby";
  const metadataUri = `ipfs://${PINATA_CID}`;

  async function createToken() {
    if (!wallet.publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    setBusy(true);
    setStatus("Preparing...");

    try {
      const nameInput = document.getElementById("name")?.value?.trim() || "My Token";
      const symbolInput = document.getElementById("symbol")?.value?.trim() || "MTK";
      const initialSupplyStr = document.getElementById("initialsupply")?.value?.trim() || "0";

      const name = nameInput.substring(0, 32);
      const symbol = symbolInput.substring(0, 10);
      const decimals = 9;

      let initialTokens;
      try {
        initialTokens = BigInt(initialSupplyStr);
        if (initialTokens < 0n) throw new Error("Initial supply cannot be negative");
      } catch (e) {
        throw new Error("Invalid initial supply. Provide an integer like 1000");
      }

      const supplyBase = initialTokens * (10n ** BigInt(decimals));

      setStatus("Fetching rent exempt amount...");
      const lamports = await getMinimumBalanceForRentExemptMint(connection);

      setStatus("Building transaction & mint...");
      const mintKeypair = Keypair.generate();

      const tx = new Transaction();

      // 1. Create mint account
      tx.add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        })
      );

      // 2. Initialize mint
      tx.add(
        createInitializeMint2Instruction(
          mintKeypair.publicKey,
          decimals,
          wallet.publicKey,
          wallet.publicKey,
          TOKEN_PROGRAM_ID
        )
      );

      setStatus("Creating metadata instruction...");

      const metadataData = {
        name,
        symbol,
        uri: metadataUri,
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
        isMutable: true,
      };

      // 3. Create metadata account
      const createMetadataIx = buildCreateMetadataInstruction(
        mintKeypair.publicKey,
        wallet.publicKey,
        wallet.publicKey,
        metadataData
      );

      tx.add(createMetadataIx);

      setStatus("Adding token account & minting...");

      // 4. Create associated token account
      const recipientATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey, 
        wallet.publicKey
      );
      
      tx.add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey, 
          recipientATA, 
          wallet.publicKey, 
          mintKeypair.publicKey
        )
      );

      // 5. Mint tokens if supply > 0
      if (supplyBase > 0n) {
        tx.add(
          createMintToCheckedInstruction(
            mintKeypair.publicKey,
            recipientATA,
            wallet.publicKey,
            supplyBase,
            decimals
          )
        );
      }

      // Set transaction metadata
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = wallet.publicKey;

      // Partial sign with mint keypair
      tx.partialSign(mintKeypair);

      setStatus("Sending transaction to wallet for approval...");
      const sig = await wallet.sendTransaction(tx, connection);

      setStatus(`Confirming transaction: ${sig.substring(0, 8)}...`);
      const confirmation = await connection.confirmTransaction({
        signature: sig,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
      }

      setStatus("✓ Token created successfully!");
      const mintAddress = mintKeypair.publicKey.toBase58();
      setLastMint(mintAddress);
      if (onTokenCreate) onTokenCreate(mintAddress);

      alert(`✓ Token created successfully!\n\nMint Address: ${mintAddress}\nMetadata URI: ${metadataUri}\n\nTransaction: ${sig}`);
    } catch (err) {
      console.error("Token creation failed:", err);
      const errorMsg = err?.message || String(err);
      alert("Error creating token: " + errorMsg);
      setStatus("✗ Error: " + errorMsg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-200 font-sans">
      <div className="w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 space-y-6 relative overflow-hidden">
        {/* Background Gradient Blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Title */}
        <div className="relative z-10 text-center space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Solana Token Launchpad
          </h2>
          <p className="text-sm text-slate-400">Create your SPL Token with one click</p>
        </div>
        
        {/* Warning Box */}
        <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded text-xs text-yellow-200">
          <strong className="block mb-1 text-yellow-400">⚠️ Dependency Check</strong>
          Ensure you are using <code>@metaplex-foundation/mpl-token-metadata@2.13.0</code>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 z-10 relative">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Token Name</label>
            <input 
              id="name" 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
              type="text" 
              placeholder="e.g. Solana Gold" 
              maxLength={32}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Token Symbol</label>
            <input 
              id="symbol" 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
              type="text" 
              placeholder="e.g. SGLD" 
              maxLength={10}
            />
          </div>

          <div>
             <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Image Metadata (Fixed)</label>
            <input 
              id="imgurl" 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-slate-500 cursor-not-allowed" 
              type="text" 
              placeholder="Using fixed IPFS CID" 
              disabled
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Initial Supply</label>
            <input 
              id="initialsupply" 
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
              type="number" 
              placeholder="e.g. 1000000" 
              min="0"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 z-10 relative">
          <button 
            onClick={createToken} 
            disabled={!wallet.connected || busy} 
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 
              ${!wallet.connected 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : busy 
                  ? 'bg-slate-700 text-slate-300 cursor-wait' 
                  : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 hover:scale-[1.02] hover:shadow-purple-500/25 text-white'
              }`}
          >
            {!wallet.connected ? "Connect Wallet First" : (busy ? "Minting Token..." : "🚀 Create Token")}
          </button>
        </div>

        {/* Success / Last Mint Display */}
        {lastMint && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 animate-fade-in">
            <div className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wide">
              Token Created Successfully
            </div>
            <div className="font-mono text-xs text-green-200 bg-green-950/50 p-2 rounded mb-3 break-all border border-green-900">
              {lastMint}
            </div>
            <a
              href={`https://explorer.solana.com/address/${lastMint}?cluster=${connection.rpcEndpoint.includes("devnet") ? "devnet" : "mainnet-beta"}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 transition-colors"
            >
              View on Solana Explorer ↗
            </a>
          </div>
        )}

        {/* Status Bar */}
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Status</span>
            <span className={`text-sm font-medium ${
              status.includes('✓') ? 'text-green-400' : 
              status.includes('✗') ? 'text-red-400' : 
              'text-slate-200'
            }`}>
              {status || "Ready to mint"}
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
}