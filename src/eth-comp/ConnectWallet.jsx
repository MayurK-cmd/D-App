import { useAccount, useDisconnect, useConnect } from 'wagmi';

export function ETHWalletConnector() {
    const { connectors, connect, error } = useConnect();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Connection</h2>
            {!isConnected ? (
                <div className="space-y-3">
                    {connectors.map((connector) => (
                        <button 
                            key={connector.uid} 
                            onClick={() => connect({ connector })}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md cursor-pointer"
                        >
                            Connect with {connector.name}
                        </button>
                    ))}
                </div>
            ) : (
                <button 
                    onClick={() => disconnect()}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md cursor-pointer"
                >
                    Disconnect Wallet
                </button>
            )}
            
            {isConnected && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Connected
                    </p>
                </div>
            )}
            {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 font-medium">Error: {error.message}</p>
                </div>
            )}
        </div>
    );
}