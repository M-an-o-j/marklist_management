import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadteacher } from '../actions/teacherActions'
import { loadstudent } from '../actions/studentActions'
import userImage from '../assets/svg/user.png'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { teacher, Trole } = useSelector((state) => state.Teacherdatastate)
  const { student, Srole } = useSelector((state) => state.Studentdatastate)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (Trole == "teacher") {
  //     dispatch(loadteacher)
  //   }
  //   if (Srole == "student") {
  //     dispatch(loadstudent)
  //   }
  // }, [dispatch])

  return (
    <div>
      <div>
        <div>
          <h1 className='title-txt text-center'>Profile here</h1>
        </div>
        <div className='d-flex gap-5 light-bg border border-3 border-dark rounded-3 text-dark p-4 my-3 text-style'>

          {student &&
            <>
              <div className='text-center d-flex flex-column gap-4'>
                <img src={userImage} className='userimage' alt="" />
                <button className='btn btn-primary'><Link className="nav-link text-style" to={'/teachers'}>Update request</Link></button>
              </div>
              <div className='w-100'>
                <div className=' '>
                  <h1 className='display-3'>Username : {student.username}</h1>
                  <h5 className='fst-italic fs-3'>Email : {student.email}</h5>
                  <h5 className='fst-italic fs-3'>Phone number : {student.phone_number}</h5>
                  <h5 className='fst-italic fs-3'>Name : {student.name}</h5>
                  <h5 className='fst-italic fs-3'>Role : {Srole}</h5>
                </div>
              </div>
            </>
          }
          {teacher &&
            <>
              <div className='text-center d-flex flex-column gap-4'>
                <img src={userImage} className='userimage' alt="" />
                <button className='btn btn-primary'><Link className="nav-link text-style" to={'/teachers'}>Update request</Link></button>
              </div>
              <div className='w-100'>
                <div className=''>
                  <h1 className='display-3'>Username : {teacher.username}</h1>
                  <h5 className='fst-italic fs-3'>Email : {teacher.email}</h5>
                  <h5 className='fst-italic fs-3'>Phone number : {teacher.phone_number}</h5>
                  <h5 className='fst-italic fs-3'>Name : {teacher.name}</h5>
                  <h5 className='fst-italic fs-3'>Role : {Trole}</h5>
                </div>
              </div>
            </>
          }
        </div>
        <div></div>
      </div>
      <div></div>

    </div>
  )
}

export default Profile
