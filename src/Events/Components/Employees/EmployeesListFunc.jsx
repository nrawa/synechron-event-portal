import { useEffect, useReducer } from "react";
import employeeServiceObj from "../Events/Services/EmployeeService";
import EmployeeDetails from "./EmployeeDetails";

const InitialState = {
    employees : [],
    employeeId : 0
}

function reducer(state,action){
    switch (action.type) {
        case 'FETCH_ALL_EMPLOYEES':
            state = {...state , employees : action.payload}
            break;
        
        case 'FETCH_EMPLOYEE_DETAILS':
            state = {...state, employeeId : action.payload}
            break;
    
        default:
            break;
    }
    return state
}

export const EmployeeListFunc = () => {
    let title = "Synechron Employee List!";
    let subTitle = "Pune Location!";

    const [state, dispatch] = useReducer(reducer, InitialState);

      useEffect(() => {
        (async ()=>{
            dispatch({
                type:'FETCH_ALL_EMPLOYEES', 
                payload:employeeServiceObj.getAllEmployees()})
        })();

        return () => {
          //componentWillUnmount
        };
      }, []);
    
      const onEmployeeSelection = (empId) => {
        dispatch({type:'FETCH_EMPLOYEE_DETAILS', payload: empId});
      };
    
      if (state.employees.length > 0) {
        return (
          <>
            <h1>{title}</h1>
            <hr />
            <h6>{subTitle}</h6>
            <hr />
            <br/>
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {state.employees.map((emp) => (
                  <tr key={emp.employeeId}>
                    <td>
                      <span>{emp.employeeName}</span>
                    </td>
                    <td>
                      <span>{emp.phone}</span>
                    </td>
                    <td>
                      <span>{emp.email}</span>
                    </td>
                    <td>
                      <span>{emp.city}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => onEmployeeSelection(emp.employeeId)}
                      >
                        Show Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            {state.employeeId > 0 ? (
              <EmployeeDetails empId={state.employeeId} />
            ) : (
              ""
            )}
          </>
        );
      } else {
        return <h3>Loading Employee List...</h3>;
      }
    };
