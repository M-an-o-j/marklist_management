import React, {useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from './components/header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './layout/home';
import Login from './layout/Login';
import { loaduser } from './actions/userActions'
import "./App.css"
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated } = useSelector((state) => state.Userdatastate)

  useEffect(() => {
    dispatch(loaduser)
  }, [dispatch])
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
