import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getstudent } from '../actions/studentActions'

const Stud_record = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getstudent);
    }, [])
    const { studentsdata, loading } = useSelector((state) => state.Getstudentdatastate)
    return (
        <div>
            <div>
                <div>
                    <h1 className='title-txt text-center pb-5'>Students Record</h1>
                </div>
                {studentsdata &&

                    <div>
                        <table className="table rounded-3 table-light table-striped-columns table-hover table-hover">
                            <thead>
                                <tr>
                                    <th scope='col' className='text-style'>S.no</th>
                                    <th scope='col' className='text-style'>Id</th>
                                    <th scope='col' className='text-style'>Name</th>
                                    <th scope='col' className='text-style'>Username</th>
                                    <th scope='col' className='text-style'>phone No.</th>
                                    <th scope='col' className='text-style'>Email</th>
                                    <th scope='col' className='text-style'>Joined At</th>

                                </tr>
                            </thead>
                            {studentsdata.map((data, idx) => (
                                <tbody>
                                    <tr>
                                        <td className='text-style'>{idx + 1}</td>
                                        <td className='text-style'>{data.student_id}</td>
                                        <td className='text-style'>{data.name}</td>
                                        <td className='text-style'>{data.username}</td>
                                        <td className='text-style'>{data.phone_number}</td>
                                        <td className='text-style'>{data.email}</td>
                                        <td className='text-style'>{data.created_at.split("T")[0]}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default Stud_record
