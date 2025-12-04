import {  getMinimumBalanceForRentExemptMint, TOKEN_PROGRAM_ID, createInitializeMint2Instruction,MINT_SIZE} from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {SystemProgram, Keypair, Transaction } from '@solana/web3.js';

export function TokenCreation({ onTokenCreate }){
    const wallet = useWallet();
    const {connection} = useConnection();

    async function createToken(){
        if (!wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        try {
            const lamports = await getMinimumBalanceForRentExemptMint(connection);
            console.log(lamports);
            const keypair = Keypair.generate();

            const transaction = new Transaction().add(
                    SystemProgram.createAccount({
                        fromPubkey: wallet.publicKey,
                        newAccountPubkey: keypair.publicKey,
                        space: MINT_SIZE,
                        lamports,
                        programId: TOKEN_PROGRAM_ID,
                    }),
                    createInitializeMint2Instruction(keypair.publicKey, 9, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
                );

            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            transaction.feePayer = wallet.publicKey;
            transaction.partialSign(keypair);

            await wallet.sendTransaction(transaction, connection);
            console.log(`Token mint created at ${keypair.publicKey.toBase58()}`);
            onTokenCreate(keypair.publicKey);
        } catch (error) {
            console.error("Token creation error:", error);
            alert("Error creating token: " + error.message);
        }
    }
    
    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input id="name" className='inputText' type='text' placeholder='Name'></input> <br />
        <input id="symbol" className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input id="imgurl" className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input id="initialsupply" className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn cursor-pointer' disabled={!wallet.connected}>
            {wallet.connected ? "Create a token" : "Connect Wallet First"}
        </button>
    </div>
}