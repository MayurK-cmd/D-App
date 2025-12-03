
import { useAccount, useBalance } from 'wagmi';

export function ETHBalance() {
    const { address } = useAccount();
    const { data: balanceData } = useBalance({ address });
    console.log(balanceData)

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Details</h2>
            {address ? (
                <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Address</p>
                        <p className="text-gray-800 font-mono text-sm break-all">{address}</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Balance</p>
                        <p className="text-3xl font-bold text-gray-800">
                            {balanceData?.value} <span className="text-xl text-gray-600">{balanceData?.symbol}</span>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">No wallet connected</p>
                </div>
            )}
        </div>
    );
}