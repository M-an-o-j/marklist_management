import React from 'react'

const Students_record = ({ students }) => {
    // students.map(data => {
    //     console.log("hii",data);
    // })
    return (
        <div>
            {
                students.map((data) => (
                    <div>
                        <h1>{data.name}</h1>
                    </div>
                ))
            }
        </div>
    )
}

export default Students_record
