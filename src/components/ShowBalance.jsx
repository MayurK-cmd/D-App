import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowBalance({ network }) {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        async function fetchBalance() {
            if (wallet.publicKey) {
                const bal = await connection.getBalance(wallet.publicKey);
                setBalance(bal / LAMPORTS_PER_SOL);
            }
        }

        fetchBalance();
    }, [wallet.publicKey, connection, network]);

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">

            <h2 className="text-slate-400 mb-2">Total Balance</h2>

            <div className="text-4xl font-bold text-white">
                {balance.toFixed(2)} SOL
            </div>

            <p className="text-xs text-slate-500 mt-2">
                Live on {network.replace("mainnet-beta", "Mainnet")}
            </p>

        </div>
    );
}