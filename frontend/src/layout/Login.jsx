import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const Login = () => {
    
    const [isStudentSelected, setStudentSelected] = useState(true);
    const [isTeacherSelected, setTeacherSelected] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUserTypeChange = (type) => {
        if (type === 'student') {
        setStudentSelected(true);
        setTeacherSelected(false);
        } else if (type === 'teacher') {
        setStudentSelected(false);
        setTeacherSelected(true);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const data = await axios.post(`http://127.0.0.1:5001/api/v1/${isTeacherSelected ? 'teacher/logininTeacher/' : 'student/signinstudent/'}`, {
            'username':username,
            'password':password
        })
        console.log(data);
    }

    return (
        <div className='loginPage'>
            <div className='text-center'>
                <h1>Login Page</h1>
            </div>
            <div className=' pt-3 loginDiv'>
                <form className='p-3 border rounded-4 loginForm' onSubmit={handleSubmit}>
                <div className='d-flex justify-content-around py-1'>
                    <div>
                        <Link className={`fw-bolder text-dark text-decoration-none p-2 px-4 rounded-3 ${isTeacherSelected ? 'bg-light' : 'null'}`} onClick={() => handleUserTypeChange('teacher')}>Teacher</Link>
                    </div>
                    <div>
                        <Link className={`fw-bolder text-dark text-decoration-none p-2 px-4 rounded-3 ${isStudentSelected ? 'bg-light' : 'null'}`} onClick={() => handleUserTypeChange('student')}>Student</Link>
                    </div>
                </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input  onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" />
                        <div id="emailHelp" className="form-text">We'll never share your credential's with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-dark">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
