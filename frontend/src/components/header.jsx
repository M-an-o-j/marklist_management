import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Logoutstudent, Logoutteacher } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()
    const { isAuthenticated,error ,role} = useSelector((state) => state.Teacherdatastate)
    const Logout = () => {
        if (role == "teacher"){
            dispatch(Logoutteacher)
        }
        if(role == "student"){
            dispatch(Logoutstudent)
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link header-txt" to="/">Home</Link>
                        </li>
                        {isAuthenticated ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link header-txt" to="/profile">MyProfile</Link>
                                </li>
                                <li>
                                    <Link className="nav-link header-txt" to="/" onClick={Logout}>Logout</Link>
                                </li>
                            </>
                            :
                            <li className="nav-item">
                                <Link className="nav-link header-txt" to="/login">Login</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
