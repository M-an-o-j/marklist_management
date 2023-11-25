import React from 'react'

const Students_record = ({ studentsdata }) => {
    // students.map(data => {
    //     console.log("hii",data);
    // })
    return (
        <div>
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
        </div>
    )
}

export default Students_record
