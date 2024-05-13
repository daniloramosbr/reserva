import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/home/home";
import Reserva from "../components/reserva/reserva";
import Login from "../components/login/login";


function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reserva" element={<Home/>} />
        <Route path="reserva/login" element={<Login/>} />
        <Route path="/reserva/services/:name" element={<Reserva/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesApp;