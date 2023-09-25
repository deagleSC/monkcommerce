import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

const App = () => {
  return (
    <div className="app">

      <BrowserRouter>
      <Routes>
      
      <Route exact path="/" element={ <Home /> }></Route>
      <Route exact path="/:id" element = { <Products /> }></Route>

      </Routes>
      </BrowserRouter>

      
      
    </div>
  );
}

export default App;
