import { Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TokenLaunchPad from './pages/TokenLaunchPad';
import Solana from './pages/Solana';
import ETH from './pages/Ethereum';

function App(){
   return(
    <Routes>
        
            <Route path='/' element={<Landing />} />
            <Route path='/sol/launch-a-token' element={<TokenLaunchPad />} />
            <Route path='/solana' element={<Solana />} />
            <Route path='/eth' element={<ETH />} />
        
    </Routes>
   )
}

export default App