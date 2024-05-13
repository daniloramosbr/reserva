import "./reserva.scss";
import Cookies from "js-cookie";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextJsx } from "../../context/Context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Reserva() {
  const [base, setBase] = useState(Array(3).fill(""));
  const [value, onChange] = useState<Value>(new Date()); //data
  const [data, setData] = useState<any>(); //todos
  const { mesa } = useContext(ContextJsx);
  const [resApi, setResApi] = useState<any>()

  const handleClick = (index: any) => {
    const New = Array(3).fill("");
    New[index] = "rgb(204, 204, 204)";
    setBase(New);
  };

  const navigate = useNavigate();

  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const userr: any = Cookies.get("user");

  const decoded: any = userr ? jwtDecode(userr) : null;

  useEffect(() => {
    Cookies.remove("token");
    function IsLoged() {
      if (!userr) {
        return navigate("/reserva/login"); //se nao tiver logado, manda pra rota login
      }
    }

    IsLoged();
  }, []);
  
  return (
    <div className="cont-reserva">
      <div className="reserva">
     {!resApi ?    <main className="main-r">
          <div className="user">
            <span>{decoded.user}</span>
          </div>
          <div className="calendar">
            <Calendar calendarType="hebrew" onChange={onChange} value={value} />
          </div>
          <div className="hour">
            <h4 onClick={(()=>{
              navigate('/reserva')
            })}>MESA {mesa} <ion-icon name="create-outline"></ion-icon></h4>

            <div className="horarios">
              {base.map((v, index) => (
                <button
                  style={{
                    background: v[0],
                  }}
                  onClick={() => {
                    const t: any = value?.toLocaleString();
                    
                    const part = t.split(", ");

                    handleClick(index);
                    setData([mesa, part[0], `1${index}:00`]);
                  }}
                  key={index}
                >
                  {" "}
                  {`1${index}:00`}{" "}
                </button>
              ))}
            </div>

            <div className="button-hour">
              <button
                onClick={() => {
                  if (data == undefined) {
                    return
                  }
                  async function PostReserve() {
                    try {
                      const res = await axios.post('https://api-reserva-6e2r.onrender.com/reserva', {
                        user: decoded.id,
                        name: decoded.user,
                        table: data[0],
                        day: data[1],
                        hour: data[2]
                      })
                      setResApi(res.data)
                    } catch (error) {
                      console.log(error)
                    }
                  }
                  PostReserve()
                }}
              >
                CONTINUAR
              </button>
            </div>
          </div>
        </main> : <main className="main-r">
        <div>
        <h3>RESERVA CRIADA COM SUCESSO!</h3>
        <div className="res">
        <span>MESA: {resApi.response.table} </span>
         <span>DATA:  {resApi.response.day} </span>
         <span>HORA:  {resApi.response.hour}</span>
        </div>
        <button onClick={(()=>{
          setResApi('')
        })}>VOLTAR</button></div>
        </main>}
      </div>
    </div>
  );
}
