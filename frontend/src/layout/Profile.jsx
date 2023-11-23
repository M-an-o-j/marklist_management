import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const { teacher, Trole } = useSelector((state) => state.Teacherdatastate)
  const { student, Srole } = useSelector((state) => state.Studentdatastate)
  return (
    <div>
      {student &&
        <div>
          <div className='border border-dark rounded-3 bg-secondary text-light p-4 my-3 text-style'>
            <h1 className='display-3'>Username : {student.username}</h1>
            <h5 className='fst-italic fs-3'>Email : {student.email}</h5>
            <h5 className='fst-italic fs-3'>Phone number : {student.phone_number}</h5>
            <h5 className='fst-italic fs-3'>Name : {student.name}</h5>
            <h5 className='fst-italic fs-3'>Role : {Srole}</h5>
          </div>
        </div>
      }
      {teacher &&
        <div>
          <div className='border border-dark rounded-3 bg-secondary text-light p-4 my-3 text-style'>
            <h1 className='display-3'>Username : {teacher.username}</h1>
            <h5 className='fst-italic fs-3'>Email : {teacher.email}</h5>
            <h5 className='fst-italic fs-3'>Phone number : {teacher.phone_number}</h5>
            <h5 className='fst-italic fs-3'>Name : {teacher.name}</h5>
            <h5 className='fst-italic fs-3'>Role : {Trole}</h5>
          </div>
        </div>
      }
    </div>
  )
}

export default Profile
