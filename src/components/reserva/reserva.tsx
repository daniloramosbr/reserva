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
import Header from "../header/header";

export default function Reserva() {
  const [base, setBase] = useState(Array(3).fill(""));
  const [value, onChange] = useState<Value>(new Date()); //data
  const [data, setData] = useState<any>(); //todos
  const { mesa } = useContext(ContextJsx);
  const [resApi, setResApi] = useState<any>();
  const [error, setError] = useState(false);
  const [errorMiss, setErrorMiss] = useState(false);


  const handleClick = (index: any) => {
    const New = Array(3).fill("");
    New[index] = ["rgb(33, 0, 180", "#ffffff"];
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
      <Header/>
      <div className="reserva">
        {!resApi ? (
          <main className="main-r">
            <div className="user">
              <span>{decoded.user}</span>
            </div>
            <div className="calendar">
              <h4>ESCOLHA UMA DATA E UM HORÁRIO</h4>
              <Calendar
                calendarType="hebrew"
                onChange={onChange}
                value={value}
              />
            </div>
            <div className="hour">
              <h4
                onClick={() => {
                  navigate("/reserva");
                }}
              >
                MESA {mesa} <ion-icon name="create-outline"></ion-icon>
              </h4>

              <div className="horarios">
                {base.map((v, index) => (
                  <button
                    style={{
                      background: v[0],
                      color: v[1],
                    }}
                    onClick={() => {
                      const t: any = value?.toLocaleString();

                      const part = t.split(", ");

                      handleClick(index);
                      setData([mesa, part[0], `1${index}:00`]);
                    }}
                    key={index}
                  >
                    {`1${index}:00`}
                  </button>
                ))}
              </div>

              <div className="button-hour">
                <button
                  onClick={() => {
                    if (data == undefined) {
                      setErrorMiss(true);
                      setTimeout(() => {
                        setErrorMiss(false);
                      }, 3000);
                      return;
                    }

                    async function PostReserve() {
                      try {
                        const res = await axios.post(
                          "https://api-reserva-js.vercel.app/reserva",
                          {
                            user: decoded.id,
                            name: decoded.user,
                            table: data[0],
                            day: data[1],
                            hour: data[2],
                          }
                        );
                        setResApi(res.data);
                      } catch (error) {
                        setError(true);
                        setTimeout(() => {
                          setError(false);
                        }, 3000);
                        console.log(error);
                      }
                    }
                    PostReserve();
                  }}
                >
                  CONTINUAR
                </button>
              </div>
              {error && <h3 className="res-error">HORÁRIO INDISPONÍVEL!</h3>}
              {errorMiss && <h3 className="res-error">ESCOLHA UM HORÁRIO!</h3>}
            </div>
          </main>
        ) : (
          <main className="main-r">
            <div>
              <h3>RESERVA ADICIONADA AO BANCO DE DADOS!</h3>
              <div className="res">
                <p>MESA: {resApi.response.table} </p>
                <p>DATA: {resApi.response.day} </p>
                <p>HORA: {resApi.response.hour}</p>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  navigate("/reserva");
                }}
              >
                VOLTAR
              </button>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
