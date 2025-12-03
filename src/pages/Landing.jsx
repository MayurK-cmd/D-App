import { Link } from "react-router-dom"


export default function Landing(){
    return(
        <div>
            <h1>Welcome to the D-APP</h1>
            <p>Select your currency</p>
            <Link to="/solana" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] cursor-pointer">Sol</Link>
            <Link to="/eth" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] cursor-pointer">Eth</Link>
            
        </div>
         
    )
}