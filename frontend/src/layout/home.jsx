import React,{ useEffect} from 'react'
import AOS from 'aos';
import { useDispatch, useSelector } from 'react-redux'
import { loaduser } from '../actions/userActions';

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loaduser)
  }, [])

  const { isAuthenticated, loading, error, user } = useSelector((state) => state.Userdatastate)
  
  return (
    <>
      <div className='text-center' data-aos="fade-in">
        <h1><span className='fw-bolder'> Marklist </span> Management</h1>
        {user ?
          <h4>{`Welcome ${user.name}`}</h4> : null
        }
      </div>

    </>
  )
}

export default Home
