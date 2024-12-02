import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'


const App = () =>(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
  </BrowserRouter>
)

export default App