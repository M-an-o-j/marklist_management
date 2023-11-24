import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import marklistsvg from '../assets/svg/open-book.png'
import studentpic from '../assets/svg/student.png'
import { Link } from 'react-router-dom';
import school from '../assets/school.png'

const Home = () => {
  const dispatch = useDispatch()

  const { TisAuthenticated, Tloading, Terror, teacher, Trole } = useSelector((state) => state.Teacherdatastate)
  const { SisAuthenticated, Sloading, Serror, student, Srole } = useSelector((state) => state.Studentdatastate)
  // useEffect(() => {

  //   if (Trole == "teacher") {
  //     dispatch(loadteacher)
  //   }
  //   if (Srole == "student") {
  //     dispatch(loadstudent)
  //   }
  // }, [])

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
      <div className='p-5 '>
        <div className='d-flex gap-5 p-4 light-bg rounded-3 border border-dark border-3'>
          <div>
            <img src={school} className="school-img rounded-3 img-fluid object-fit-cover" alt="" />
          </div>
          <div className='w-75'>
            <h1 className='text-style fw-bolder text-wrap'>Welcome to our school</h1>
            <p className='text-style lh-lg'>Welcome to our school, where learning is an exciting journey and every student is encouraged to reach for the stars. At [School Name], we believe in fostering a nurturing environment that stimulates curiosity, creativity, and a love for knowledge. Our dedicated team of educators is committed to providing a world-class education, guiding students to discover their unique talents and potential. As you step into our halls, you become part of a vibrant community where academic excellence, character development, and personal growth are celebrated. We look forward to inspiring and supporting you on your educational adventure at [School Name]. Together, let's create a future filled with endless possibilities.</p>
          </div>
        </div>
      </div>

      {Trole == "teacher" && teacher ?
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
        Srole == "student" && student ?
          <>
            <div className='d-flex justify-content-around w-100 light-bg p-5 border border-3 border-dark rounded-3'>
              <div className=''>
                <img src={marklistsvg} className='home-img' alt="" />
              </div>
              <div>
                <h1 className='text-style'>Marklist</h1>
                <p className='text-wrap text-style'>Here students can get <br /> their marklist.</p>
                <button className='btn btn-primary'><Link className="nav-link text-style" to={'/marklist'}>Click here</Link></button>
              </div>
            </div>
          </> : null
      }

    </>
  )
}

export default Home
