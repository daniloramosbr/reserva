import './data.scss'
import Header from "../header/header"
import Onedata from './onedata'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiController from '../../controllers/ApiController';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function Data() {

  const user: any = Cookies.get('user');     

  const decoded: any = user ? jwtDecode(user) : null

  interface DataItem {
    table: string;
    day: string;
    hour: string;
  }
  
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(()=> {

 const getReserved = async () => {


  try {

    const res: any = await ApiController.GetReserve(decoded.id)
    setData(res.data)
  } catch (error) {
    console.log(error)
  }

}

getReserved()


  },[])

  const navigate = useNavigate();

  return (
    <div className="cont-data">
   <Header/>
    <div className="data">
    <h1>SUAS RESERVAS:</h1>
   {data.length >= 1 ? data.map((data)=>{

    return (
      <Onedata table={data.table} day={data.day} hour={data.hour} key={data.table}/>
    )
}) : <div className='cont-load'><div className="custom-loader"></div></div> }
    <button className="btn btn-outline-primary" onClick={()=>{
      navigate('/reserva')
    }}>VOLTAR</button>
    </div>
  </div>
  )
}
