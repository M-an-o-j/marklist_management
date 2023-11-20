import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from './components/header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './layout/home';
import Login from './layout/Login';
import "./App.css"

const App = () => {
  return (
    <>
      <Router>
        <div className='overflow-x-hidden'>
          <div className='container-fluid'>
            <Header />
            <div className='px-3'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
