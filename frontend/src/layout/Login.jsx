import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginteacher } from '../actions/teacherActions'
import '../App.css'
import eye from '../assets/svg/eye.svg'
import { loginstudent } from '../actions/studentActions'

const Login = () => {

    const [isStudentSelected, setStudentSelected] = useState(true);
    const [isTeacherSelected, setTeacherSelected] = useState(false);
    const [hide, sethide] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { TisAuthenticated, Terror } = useSelector((state) => state.Teacherdatastate)
    const { SisAuthenticated, Serror } = useSelector((state) => state.Studentdatastate)
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const dispatch = useDispatch()

    const navigate = useNavigate();

    useEffect(() => {
        if (SisAuthenticated) {
            navigate("/")
        }
        if (TisAuthenticated) {
            navigate("/")
        }
    }, [SisAuthenticated, TisAuthenticated])

    const handleUserTypeChange = (type) => {
        if (type === 'student') {
            setStudentSelected(true);
            setTeacherSelected(false);
        } else if (type === 'teacher') {
            setStudentSelected(false);
            setTeacherSelected(true);
        }
    };

    const handleteacherSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginteacher(username, password))
        // navigate("/")

    }
    const handlestudentSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginstudent(username, password))
        // navigate("/")
    }

    return (
        <div className='loginPage'>
            <div className='text-center'>
                <h1 className='title-txt'>Login Page</h1>
            </div>
            <div className=' pt-3 loginDiv'>
                <form className='p-3 border rounded-4 light-bg' onSubmit={isTeacherSelected ? handleteacherSubmit : handlestudentSubmit}>
                    <div className='d-flex justify-content-around py-1'>
                        <div>
                            <Link className={`fw-bolder text-style text-dark text-decoration-none p-2 px-4 rounded-3 ${isTeacherSelected ? 'bg-light' : 'null'}`} onClick={() => handleUserTypeChange('teacher')}>Teacher</Link>
                        </div>
                        <div>
                            <Link className={`fw-bolder text-style text-dark text-decoration-none p-2 px-4 rounded-3 ${isStudentSelected ? 'bg-light' : 'null'}`} onClick={() => handleUserTypeChange('student')}>Student</Link>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="text-style form-label">Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control text-style" />
                        <div id="emailHelp" className="text-style form-text">We'll never share your credential's with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="text-style form-label">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} hidden={false} type={showPassword ? 'text' : 'password'} className="form-control text-style" id="exampleInputPassword1" />
                        <input
                            className='checkbox'
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={handleTogglePassword}
                        />
                        <label htmlFor="showPassword" className='p-2 text-style'>Show Password</label>
                    </div>
                    <button type="submit" className="btn btn-dark text-style">Login</button>
                    {
                        Serror ?
                            <p className='text-danger fw-semibold text-center'>{`${Serror.data.detail}`}</p> : null
                    }
                    {
                        Terror ?
                            <p className='text-danger fw-semibold text-center'>{`${Terror.data.detail}`}</p> : null
                    }

                </form>
            </div>
        </div>
    )
}

export default Login
