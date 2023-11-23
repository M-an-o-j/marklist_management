import React, {useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from './components/header'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Home from './layout/home';
import Login from './layout/Login';
import { loadstudent, loadteacher, loaduser } from './actions/userActions'
import "./App.css"
import { useDispatch, useSelector } from 'react-redux'
import Profile from './layout/Profile';
import Marklist from './layout/Marklist';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, user, role } = useSelector((state) => state.Teacherdatastate)
  // useEffect(() => {

  //   if (role == "teacher" || role === null) {
  //     dispatch(loadteacher)
  //   } else {
  //     dispatch(loadstudent)
  //   }
  // }, [dispatch])
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
                <Route path='/profile' element={<Profile />} />
                <Route path='/marklist' element={isAuthenticated ? <Marklist /> : <Navigate to={"/"} />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
