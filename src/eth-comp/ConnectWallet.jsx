import { http, createConfig, useAccount, useDisconnect, useBalance, useConnect, useSendTransaction } from 'wagmi';

export function ETHWalletConnector() {
    const { connectors, connect, error } = useConnect();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect(); // Add disconnect hook

    return (
        <div>
            {!isConnected ? (
                <>
                    {connectors.map((connector) => (
                        <button key={connector.uid} onClick={() => connect({ connector })}>
                            Connect with {connector.name}
                        </button>
                    ))}
                </>
            ) : (
                <button onClick={() => disconnect()}>
                    Disconnect Wallet
                </button>
            )}
            
            {isConnected && <p>Connected</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
