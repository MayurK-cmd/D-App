import { http, createConfig, useAccount, useDisconnect, useBalance, useConnect, useSendTransaction } from 'wagmi';

export function ETHBalance() {
    const { address } = useAccount();
    const { data: balanceData } = useBalance({ address });

    return (
        <div>
            {address ? (
                <>
                    <p>Address: {address}</p>
                    <br></br>
                    <p>Balance: {balanceData?.formatted} {balanceData?.symbol}</p>
                </>
            ) : (
                <p>No wallet connected</p>
            )}
        </div>
    );
}