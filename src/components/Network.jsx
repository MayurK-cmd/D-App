import React from 'react';
import { useConnection } from '@solana/wallet-adapter-react';

export function NetworkStatusBar() {
  const { connection } = useConnection();
  
  // Safely get the endpoint, defaulting to string just in case
  const endpoint = connection?.rpcEndpoint || '';
  
  let networkName = 'Unknown Network';
  let statusColor = 'bg-slate-500';
  let badgeBorder = 'border-slate-600';
  let textColor = 'text-slate-400';

  // Determine Network based on URL
  if (endpoint.includes('devnet')) {
    networkName = 'Devnet';
    statusColor = 'bg-purple-500';
    badgeBorder = 'border-purple-500/30';
    textColor = 'text-purple-400';
  } else if (endpoint.includes('testnet')) {
    networkName = 'Testnet';
    statusColor = 'bg-yellow-500';
    badgeBorder = 'border-yellow-500/30';
    textColor = 'text-yellow-400';
  } else if (endpoint.includes('mainnet')) {
    networkName = 'Mainnet Beta';
    statusColor = 'bg-emerald-500';
    badgeBorder = 'border-emerald-500/30';
    textColor = 'text-emerald-400';
  } else if (endpoint.includes('localhost') || endpoint.includes('127.0.0.1')) {
    networkName = 'Localhost';
    statusColor = 'bg-orange-500';
    badgeBorder = 'border-orange-500/30';
    textColor = 'text-orange-400';
  }

  return (
    <div className="w-full bg-slate-950/50 backdrop-blur-sm border-b border-slate-800 py-1.5 px-4 flex items-center justify-between sm:justify-center relative z-40">
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${badgeBorder} bg-slate-900/50`}>
        {/* Pulsing Dot Indicator */}
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusColor} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${statusColor}`}></span>
        </span>
        
        {/* Network Name */}
        <span className={`text-xs font-bold tracking-wide uppercase ${textColor}`}>
          {networkName}
        </span>
      </div>

      {/* Optional: Show Endpoint URL on larger screens */}
      <div className="hidden sm:block absolute right-4 text-[10px] text-slate-600 font-mono">
        RPC: {new URL(endpoint).hostname}
      </div>
    </div>
  );
}