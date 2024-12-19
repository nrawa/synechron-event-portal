import { BrowserRouter } from "react-router-dom"
import { EmployeeListFunc } from "./Employees/Components/EmployeesListFunc"
import { EventsListFunc } from "./Events/Components/EventListFunc"
import SepHome from "./Home/SepHome"
import Navbar from "./Navigation/Components/Navbar"
import MainLayout from "./MainLayout"

function App() {

  return (
    <>
    <BrowserRouter>
      <MainLayout/>
    </BrowserRouter>
    </>
  )
}

export default App
