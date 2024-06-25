import './data.scss'

interface info {

  table: string;
  day: string;
  hour: string;

}

export default function Onedata({table, day, hour}: info) {

  
  return (
    <main className='cont-onedata'>
     <p>Mesa: {table}</p> <p>Dia: {day} </p> <p>Hora: {hour} </p> <button><ion-icon name="trash-outline"></ion-icon></button>
    </main>
  )
}
