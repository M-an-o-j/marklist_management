import React, { useEffect } from 'react'
import AOS from 'aos';
import { useDispatch, useSelector } from 'react-redux'
import { loadteacher } from '../actions/teacherActions';
import marklistsvg from '../assets/svg/open-book.png'
import studentpic from '../assets/svg/student.png'
import { Link } from 'react-router-dom';
import { loadstudent } from '../actions/studentActions';

const Home = () => {
  const dispatch = useDispatch()

  const { TisAuthenticated, Tloading, Terror, teacher, Trole } = useSelector((state) => state.Teacherdatastate)
  const { SisAuthenticated, Sloading, Serror, student, Srole } = useSelector((state) => state.Studentdatastate)
  useEffect(() => {

    if (Trole == "teacher") {
      dispatch(loadteacher)
    }
    if (Srole == "student") {
      dispatch(loadstudent)
    }
  }, [])

  return (
    <>
      <div className='text-center' data-aos="fade-in">
        <h1 className='title-txt'><span className=''> Marklist </span> Management</h1>
        {teacher ?
          <h4 className='title-txt'>{`Welcome ${teacher.name}`}</h4> : null
        }
        {student ?
          <h4 className='title-txt'>{`Welcome ${student.name}`}</h4> : null
        }
      </div>

      {Trole == "teacher" ?
        <div className='d-flex justify-content-between p-5 gap-3'>
          <div className='d-flex justify-content-around w-100 light-bg p-5 border border-3 border-dark rounded-3 gap-3'>
            <div className=''>
              <img src={marklistsvg} className='home-img' alt="" />
            </div>
            <div>
              <h1 className='text-style'>Marklist</h1>
              <p className='text-wrap text-style'>Teacher can create, update, <br /> delete and read marklist here</p>
              <button className='btn btn-primary'><Link className="nav-link text-style" to={'/marklist'}>Click here</Link></button>
            </div>
          </div>
          <div className='d-flex justify-content-around w-100 light-bg p-5 border border-3 border-dark rounded-3'>
            <div className=''>
              <img src={studentpic} className='home-img' alt="" />
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
        Srole == "student" ?
          <>
            <div className='d-flex justify-content-around w-100 light-bg p-5 border border-3 border-dark rounded-3'>
              <div className=''>
                <img src={marklistsvg} className='home-img' alt="" />
              </div>
              <div>
                <h1 className='text-style'>Marklist</h1>
                <p className='text-wrap text-style'>Here students can get and <br /> their marklist.</p>
                <button className='btn btn-primary'><Link className="nav-link text-style" to={'/marklist'}>Click here</Link></button>
              </div>
            </div>
            </> : null
      }

          </>
  )
}

      export default Home
