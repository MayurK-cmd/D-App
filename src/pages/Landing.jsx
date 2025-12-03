import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/30 rounded-full blur-[100px]" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
        
        {/* Header Section */}
        <div className="mb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight">
            Welcome to D-APP
          </h1>
          <p className="text-slate-400 text-lg">
            Choose your blockchain to get started
          </p>
        </div>

        {/* Buttons Grid */}
        <div className="w-full grid gap-4 sm:grid-cols-2">
          {/* Solana Button */}
          <Link
            to="/solana"
            className="group relative inline-flex items-center justify-center px-6 py-4 bg-gradient-to-br from-[#9945FF] to-[#14F195] rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(153,69,255,0.4)] active:scale-95"
          >
            <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Solana
            </span>
          </Link>

          {/* Ethereum Button */}
          <Link
            to="/eth"
            className="group relative inline-flex items-center justify-center px-6 py-4 bg-gradient-to-br from-[#454A75] to-[#8A92B2] rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(98,126,234,0.4)] active:scale-95"
          >
            <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Ethereum
            </span>
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Secure • Decentralized • Fast
        </p>
      </div>
    </div>
  );
}