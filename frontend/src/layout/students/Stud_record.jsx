import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getstudent } from '../../actions/studentActions'
import Students_record from '../../components/students_record'

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
                    <Students_record studentsdata={studentsdata} />
                }
            </div>
        </div>
    )
}

export default Stud_record
