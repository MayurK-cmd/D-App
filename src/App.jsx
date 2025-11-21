import { Routes, Route } from 'react-router-dom';
import { TokenLaunchPad } from './pages/TokenLaunchPad';
import Landing from './pages/Landing';

function App(){
   return(
    <Routes>
        
            <Route path='/' element={<Landing />} />
            <Route path='/LaunchPad' element={<TokenLaunchPad />} />
        
    </Routes>
   )
}

export default App