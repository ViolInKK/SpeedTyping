import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import MainPage from './views/mainpage'
import Header from './components/Header'
import Login from './views/auth'
import Signup from './views/registr'

function App() {

  return(
      <BrowserRouter>
      <Header/>
        <main>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
          </Routes>
        </main>
      </BrowserRouter>
  )
}

export default App

