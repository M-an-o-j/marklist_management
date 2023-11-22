import React, { useEffect } from 'react'
import AOS from 'aos';
import { useDispatch, useSelector } from 'react-redux'
import { loadstudent, loadteacher } from '../actions/userActions';
import marklistsvg from '../assets/svg/open-book.png'
import student from '../assets/svg/student.png'

const Home = () => {
  const dispatch = useDispatch()

  const { isAuthenticated, loading, error, user, role } = useSelector((state) => state.Teacherdatastate)
  useEffect(() => {

    if (role == "teacher") {
      dispatch(loadteacher)
    }
    if (role == "student") {
      dispatch(loadstudent)
    }
  }, [])

  return (
    <>
      <div className='text-center' data-aos="fade-in">
        <h1 className='title-txt'><span className=''> Marklist </span> Management</h1>
        {user ?
          <h4 className='title-txt'>{`Welcome ${user.name}`}</h4> : null
        }
      </div>

      {role == "teacher" ?
        <div className='d-flex justify-content-between p-5 gap-3'>
          <div className='d-flex justify-content-around w-100 light-bg p-5 border border-3 border-dark rounded-3'>
            <div className=''>
              <img src={marklistsvg} className='home-img' alt="" />
            </div>
            <div>
              <h1 className='text-style'>Marklist</h1>
              <p className='text-wrap text-style'>Teacher can create, update, <br /> delete and read marklist here</p>
              <button className='btn btn-primary'>Click here</button>
            </div>
          </div>
          <div className='d-flex justify-content-around w-100 light-bg p-5 border border-3 border-dark rounded-3'>
            <div className=''>
              <img src={student} className='home-img' alt="" />
            </div>
            <div>
              <h1 className='text-style'>Student</h1>
              <p className='text-wrap text-style'>Teacher can create, update, <br /> delete and read student here</p>
              <button className='btn btn-primary'>Click here</button>
            </div>
          </div>
        </div> : null
      }
      {
        role == "student" ?
          <>
            <div className='d-flex justify-content-around w-100 light-bg p-5 border border-3 border-dark rounded-3'>
              <div className=''>
                <img src={marklistsvg} className='home-img' alt="" />
              </div>
              <div>
                <h1 className='text-style'>Marklist</h1>
                <p className='text-wrap text-style'>Here students can get and <br /> their marklist.</p>
                <button className='btn btn-primary'>Click here</button>
              </div>
            </div>
            </> : null
      }

          </>
  )
}

      export default Home
