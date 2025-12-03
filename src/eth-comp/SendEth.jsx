import { http, createConfig, useAccount, useDisconnect, useBalance, useConnect, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import React, { useState } from 'react';

export function EthSend() {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const { data: hash, isPending, isSuccess, isError, error, sendTransaction } = useSendTransaction();

    const handleSend = () => {
        if (!address || !amount) {
            alert('Please enter both address and amount');
            return;
        }

        try {
            sendTransaction({
                to: address,
                value: parseEther(amount)
            });
        } catch (err) {
            console.error('Error sending transaction:', err);
        }
    };

    return (
        <div>
            <br></br>
            <h3>Send ETH</h3>
            <input 
                type="text" 
                placeholder="Recipient Address (0x...)" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
            />
            <br></br>
            <input 
                type="text" 
                placeholder="Amount in ETH (e.g., 0.1)" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />
            <br></br>
            <button onClick={handleSend} disabled={isPending}>
                {isPending ? 'Sending...' : 'Send ETH'}
            </button>

            {isSuccess && (
                <div>
                    <p>Transaction sent successfully!</p>
                    <p>Hash: {hash}</p>
                </div>
            )}
            {isError && <p>Error: {error?.message}</p>}
        </div>
    );
}