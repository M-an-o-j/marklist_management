import React from 'react'
import studentpic from '../../assets/students.jpg'
import { Link } from 'react-router-dom'
import studentrecords from '../../assets/records.jpg'
import create from '../../assets/create_student.jpg'
import { useSelector } from 'react-redux'

const Students = () => {
    const { TisAuthenticated, Tloading, Terror, teacher, Trole } = useSelector((state) => state.Teacherdatastate)
    const { SisAuthenticated, Sloading, Serror, student, Srole } = useSelector((state) => state.Studentdatastate)
    return (
        <div>
            <div className='p-5'>
                <div className='d-flex gap-5 p-4 light-bg rounded-3 border border-dark border-3'>
                    <div>
                        <img src={studentpic} className="school-img rounded-3 img-fluid object-fit-cover" alt="" />
                    </div>
                    <div className='w-75'>
                        <h1 className='text-style fw-bolder text-wrap'>Students</h1>
                        <p className='text-style lh-lg'>Students are individuals engaged in the pursuit of knowledge and skill development within educational institutions. This diverse group encompasses learners of various ages, backgrounds, and aspirations, all sharing a common goal of academic and personal growth. Students navigate a dynamic learning environment, facing challenges, exploring new ideas, and cultivating critical thinking. As they acquire knowledge and hone their abilities, students contribute to the vibrant tapestry of education, embodying the potential for innovation, progress, and future leadership in society.As bearers of potential and future leaders, students contribute to the vibrancy of educational communities, embodying the promise of progress, innovation, and positive societal impact.</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between pt-5 gap-3'>
                    {Trole == "teacher" && teacher ?
                        <>
                            <div className='d-flex justify-content-around w-100 light-bg p-5 border border-3 border-dark rounded-3 gap-3'>
                                <div className=''>
                                    <img src={studentrecords} className='home-img img-fluid object-fit-cover rounded-3' alt="" />
                                </div>
                                <div>
                                    <h1 className='text-style'>Records</h1>
                                    <p className='text-wrap text-style'>Teacher can create, update, <br /> delete and read marklist here</p>
                                    <button className='btn btn-primary'><Link className="nav-link text-style" to={'/students-record'}>Click here</Link></button>
                                </div>
                            </div>
                            <div className='d-flex justify-content-around w-100 light-bg p-5 border border-3 border-dark rounded-3'>
                                <div className=''>
                                    <img src={create} className='home-img img-fluid object-fit-cover rounded-3' alt="" />
                                </div>
                                <div>
                                    <h1 className='text-style'>Create</h1>
                                    <p className='text-wrap text-style'>Teacher can create, update, <br /> delete and read student here</p>
                                    <button className='btn btn-primary'>Click here</button>
                                </div>

                            </div>
                        </>
                        : null}
                    {Srole == "student" && student ?
                        <>
                            <div className='d-flex justify-content-around w-100 light-bg p-5 border border-3 border-dark rounded-3'>
                                <div className='w-50'>
                                    <img src={studentrecords} className='home-img w-100 img-fluid object-fit-cover rounded-3' alt="" />
                                </div>
                                <div>
                                    <h1 className='text-style'>Records</h1>
                                    <p className='text-wrap text-style'>Teacher can create, update, <br /> delete and read marklist here</p>
                                    <button className='btn btn-primary'><Link className="nav-link text-style" to={'/students-record'}>Click here</Link></button>
                                </div>
                            </div>
                        </>
                        : null}
                </div>
            </div>
        </div >
    )
}

export default Students
