import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const { isAuthenticated, loading, error, user, role } = useSelector((state) => state.Teacherdatastate)
  return (
    <div>
      {user &&
        <div>
          <div className='border border-dark rounded-3 bg-secondary text-light p-4 my-3 text-style'>
            <h1 className='display-3'>Username : {user.username}</h1>
            <h5 className='fst-italic fs-3'>Email : {user.email}</h5>
            <h5 className='fst-italic fs-3'>Phone number : {user.phone_number}</h5>
            <h5 className='fst-italic fs-3'>Name : {user.name}</h5>
            <h5 className='fst-italic fs-3'>Role : {role}</h5>
          </div>
        </div>
      }
    </div>
  )
}

export default Profile
