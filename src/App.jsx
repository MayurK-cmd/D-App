import { Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TokenLaunchPad from './pages/TokenLaunchPad';

function App(){
   return(
    <Routes>
        
            <Route path='/' element={<Landing />} />
            <Route path='/launch-a-token' element={<TokenLaunchPad />} />
        
    </Routes>
   )
}

export default App