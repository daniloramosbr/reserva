import "./login.scss";
import { GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useContext, useEffect} from "react";
import {ContextJsx} from '../../context/Context'

export default function Login() {

  const navigate = useNavigate();
  
const {setData} = useContext(ContextJsx)

  useEffect(()=>{

    const user: any = Cookies.get('user')

    const decoded: any = user ? jwtDecode(user) : null

    function IsLoged () {

      if (user) {
         return navigate(`/reserva/services/${decoded.user}`)          //verifica se ja esta logado
      }
    }

    IsLoged()
  },[])
 

 async function LoginGoogle () {

  const token: any = Cookies.get('token')         //email e username do google
  const decoded: any = jwtDecode(token)

    try {
   
      const res: any = await axios.post("https://api-reserva-js.vercel.app/login", {     //adicionando no banco de dados do app
        username: decoded.name,
        email: decoded.email
      })

      setData(res.data)       //envia token com id e 
      Cookies.set("user", res.data.token)   //envia token id e user pro user

      navigate(`/reserva/services/${decoded.name}`)

  } catch (err) {

    console.log(err);
  }
  }

  return (
    <div className="cont-login">
      <div className="login">
        <main className="main-login">
          <h2>
            <ion-icon name="fast-food-outline"></ion-icon> FOOD RESERVAS
          </h2>
          <span>
            É necessário fazer login para realizar a reserva. Caso ainda não
            tenha uma conta, crie uma agora mesmo!
          </span>
         <span className="google"> <GoogleLogin
            width={300}
            shape="circle"
            text="continue_with"
            onSuccess={(credentialResponse) => {
              
              const token: any = credentialResponse.credential;
              Cookies.set('token', token)
              LoginGoogle()
              
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          /></span>
        </main>
      </div>
    </div>
  );
}
