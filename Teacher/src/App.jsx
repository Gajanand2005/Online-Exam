import React from 'react'
import Navbar from './components/Navbar/Index'
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import TeacherLogin from './components/TeacherLogin/Index';
import Exam from './components/Exam';
const App = () => {
  return (
    <>
     <BrowserRouter>
            <Routes>
             <Route path="/" element={<Navbar />}></Route>
            <Route path='/teacher-login' element={<TeacherLogin/>}></Route>
            <Route path='/exam' element={<Exam/>}></Route>
            </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
