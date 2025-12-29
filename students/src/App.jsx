import React from "react";
import Navbar from "./components/Navbar/Index";
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import ExamFormat from "./components/ExamFormat/Index";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}></Route>
          <Route path="/ExamFormat" element={<ExamFormat />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
