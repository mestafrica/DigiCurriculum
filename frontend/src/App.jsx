import { BrowserRouter, Route, Routes } from "react-router-dom";
import Frontsetup from "./pages/Frontsetup";

import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    
    </BrowserRouter>
      <Frontsetup />
      
    </>
  );
}

export default App;
