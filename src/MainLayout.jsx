import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SepHome from './Home/SepHome';
//import { EmployeeListFunc } from './Employees/Components/EmployeesListFunc';
//import { EventsListFunc } from './Events/Components/EventListFunc';
import Navbar from './Navigation/Components/Navbar';
import Footer from './Navigation/Components/Footer';
import Login from './Security/Components/Login';
import { ProtectedRoutes } from './ProtectedRoutes';

const EmployeeListFunc = lazy(()=>import('./Employees/Components/EmployeesListFunc'));
const EventsListFunc = lazy(()=>import('./Events/Components/EventListFunc'));

const MainLayout = () => {
    const location = useLocation()
  return (
    <>
    <Navbar/>
    <Suspense fallback={()=> <h2>Wait! Contents are Loading....</h2>}>
      <Routes>
        <Route path='/' element={<SepHome />} />
        <Route path='/home' element={<SepHome />} />
        <Route element={ <ProtectedRoutes isAuthenticated={getTokenFromLocalStorage('token')}
        returnUrl={location.pathname}/>}>
            <Route path='/employees' element={<EmployeeListFunc />} />
            <Route path='/events' element={<EventsListFunc />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
      </Suspense>
    <Footer/>
    </>
  )
}

export default MainLayout


function getTokenFromLocalStorage(key){
    let result = localStorage.getItem(key);
    if(result) return true
    else return false
}
