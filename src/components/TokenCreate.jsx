import {  getMinimumBalanceForRentExemptMint, TOKEN_PROGRAM_ID, createInitializeMint2Instruction,MINT_SIZE} from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {SystemProgram, Keypair, Transaction } from '@solana/web3.js';

export function TokenCreation(){
    const wallet = useWallet();
    const {connection} = useConnection();


    async function createToken(){
        const name = document.getElementById("name").value;
        const symbol = document.getElementById("symbol").value;
        const imgurl = document.getElementById("imgurl").value;
        const initialsupply = document.getElementById("initialsupply").value;

        //createMint();
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
                createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
            );

            const recentBlockhash = await connection.getLatestBlockhash();
            transaction.recentBlockhash = recentBlockhash.blockhash;
            transaction.feePayer = wallet.publicKey;

           transaction.partialSign(keypair);
           let response = await wallet.sendTransaction(transaction, connection);
           console.log(response);
           alert("Token created Successfully here is the pubKey : " + response);
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
        <button onClick={createToken} className='btn cursor-pointer'>Create a token</button>
    </div>

}