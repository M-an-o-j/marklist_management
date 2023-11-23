import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadmarklist } from '../actions/marklistActions'

const Marklist = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadmarklist)
    }, [dispatch])

    const { loading, marklist } = useSelector((state) => state.Marklistdatastate)

    return (
        <>
            <div className="">
                <div className="title-txt text-center">
                    <h1>Marklist</h1>
                </div>
                {marklist &&

                    <div>
                        <table className="table rounded-3 table-light table-striped-columns table-hover table-hover">
                            <thead>
                                <tr>
                                    <th scope='col' className='text-style'>S.no</th>
                                    <th scope='col' className='text-style'>Subject Id</th>
                                    <th scope='col' className='text-style'>Student Id</th>
                                    <th scope='col' className='text-style'>Mark</th>
                                    <th scope='col' className='text-style'>Total Mark</th>
                                    <th scope='col' className='text-style'>Percentage</th>
                                </tr>
                            </thead>
                            {marklist.map((data,idx) => (
                                <tbody>
                                    <tr>
                                        <td className='text-style'>{idx+1}</td>
                                        <td className='text-style'>{data.subject_id}</td>
                                        <td className='text-style'>{data.student_id}</td>
                                        <td className='text-style'>{data.actual_mark}</td>
                                        <td className='text-style'>{data.out_of_mark}</td>
                                        <td className='text-style'>{data.percentage}%</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                }
            </div>
        </>
    )
}

export default Marklist
