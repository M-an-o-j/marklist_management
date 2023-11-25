import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from './components/header'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Home from './layout/home';
import Login from './layout/Login';
import { loadteacher } from './actions/teacherActions'
import "./App.css"
import { useDispatch, useSelector } from 'react-redux'
import Profile from './layout/Profile';
import Marklist from './layout/Marklist';
import { loadstudent } from './actions/studentActions';
import Students from './layout/students';
import Stud_record from './layout/Stud_record';

const App = () => {
  const dispatch = useDispatch();
  const { TisAuthenticated, Trole } = useSelector((state) => state.Teacherdatastate)
  const { SisAuthenticated, Srole } = useSelector((state) => state.Studentdatastate)
  useEffect(() => {
      if (Trole == "teacher") {
        dispatch(loadteacher)
      }
      if (Srole == "student") {
        dispatch(loadstudent)
      }
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
                <Route path='/profile' element={SisAuthenticated || TisAuthenticated ? <Profile /> : <Navigate to={"/"} />} />
                <Route path='/marklist' element={SisAuthenticated || TisAuthenticated ? <Marklist /> : <Navigate to={"/"} />} />
                <Route path='/students' element={SisAuthenticated || TisAuthenticated ? <Students /> : <Navigate to={"/"} />} />
                <Route path='/students-record' element={SisAuthenticated || TisAuthenticated ? <Stud_record /> : <Navigate to={"/"} />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
