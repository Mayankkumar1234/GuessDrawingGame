import React from 'react'
import Form from "./components/Forms/index"
import Home from  "./pages/Home/index"
import {Link , Route, Routes} from "react-router-dom"
import Main from "./components/index"

const App = () => {
  return (
    <React.Fragment>
     <div className='w-full h-full' >  
    </div>

     <Routes>
       <Route path='/' element={<Home />}  />
     <Route path='/play/:roomId' element={<Main />}  />
  </Routes>
      </React.Fragment>
  )
}

export default App;
