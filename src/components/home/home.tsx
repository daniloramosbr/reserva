import { useState, useContext } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ContextJsx } from "../../context/Context";
import Header from "../header/header";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
    interface JwtPayload {
      user: string;
    }
  }
}

export default function Home() {

  const [error, setError] = useState(false)

  const user: any = Cookies.get('user');     //funcionando logado

  const decoded: any = user ? jwtDecode(user) : null

  const navigate = useNavigate();

  const [cor, setCor] = useState(Array(5).fill("")); //cria 5 array com nada dentro

const {mesa, setMesa} = useContext(ContextJsx)

  const handleClick = (index: any) => {
    //index pega cada element
    const newCor = Array(5).fill(""); // Desmarca todos os itens
    newCor[index] = [
      "rgb(204, 204, 204)",
      "checkmark-circle-outline",
      "SELECIONADO",
    ]; // Marca o item clicado
    setCor(newCor);
    setMesa(index + 1);
  };

  return (
    <div className="cont-home">
      <Header/>
      <div className="home">
       
        <main className="cont-main">
         
          <h2>ESCOLHA SUA MESA:</h2>
          <div className="cont-m">
            {cor.map((v, index) => (
                <li
                  key={index}
                  style={{ backgroundColor: v[0] }}
                  onClick={() =>
                    handleClick(index)}>
                  <h4>
                    <ion-icon name={v[1] ? v[1] : "ellipse-outline"}></ion-icon>
                    MESA {index + 1}
                  </h4>
                  <span>
                    {v[2] ? <div className="select">{v[2]}</div> : "SELECIONAR"}
                  </span>
                </li>
              )
            )}
          </div>
           {error && <h3 style={{
            textAlign: "center",
            color: '#da1b1b'
           }}>SELECIONE UMA MESA!</h3>}
          <button className="btn btn-primary" style={{
            height: 45,
            borderRadius: 10,
          }}
            onClick={() => {
              if (!mesa) {
                setError(true)
                setTimeout(() => {

                  setError(false)
                  
                }, 3000);
                return
              }

              {
                decoded
                  ? navigate(`/reserva/services/${decoded.user}`)
                  : navigate("/reserva/login");
              }
            }}
          >
            <h3>CONTINUAR</h3>
          </button>
        </main>
      </div>
    </div>
  );
}
