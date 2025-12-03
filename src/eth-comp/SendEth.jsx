import { useSendTransaction } from 'wagmi';
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
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Send ETH</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recipient Address
                    </label>
                    <input 
                        type="text" 
                        placeholder="0x..." 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount (ETH)
                    </label>
                    <input 
                        type="text" 
                        placeholder="0.1" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <button 
                    onClick={handleSend} 
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-md"
                >
                    {isPending ? 'Sending...' : 'Send ETH'}
                </button>

                {isSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 font-semibold mb-2">Transaction sent successfully!</p>
                        <p className="text-sm text-gray-600">Hash:</p>
                        <p className="text-sm text-gray-800 font-mono break-all">{hash}</p>
                    </div>
                )}
                {isError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 font-medium">Error: {error?.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}