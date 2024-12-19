import React, { useEffect, useState } from 'react';
import employeeServiceObj from "../Services/EmployeeService";

const EmployeeDetails = ({empId}) => {
    let title = "Details Of Employee - ";

    const [empData, setEmpData] = useState(null);

    useEffect(()=>{
         setEmpData(employeeServiceObj.getEmployeeDetails(empId))
    },[empId])

    if(empData) return (
        <div>
        <h1>{title + empData.employeeName}</h1>
        </div>
    )
    else return <div>Loading Employee Details....</div>
}
export default EmployeeDetails
