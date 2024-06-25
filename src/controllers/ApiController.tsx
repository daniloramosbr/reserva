import axios from "axios";

const Url = "https://api-reserva-ts.vercel.app";

class ApiController {

   async PostLogin(name: string, email: string) {
    try {
      return await axios.post(`${Url}/login`, {
        username: name,
        email: email
      })
    } catch (error) {
      return error
    }
  }

  async PostReserve (user: string, name:string, table: string, day: string, hour:string) {
    try {
      return await axios.post(`${Url}/reserva`, {
        user: user, 
        name: name,
        table: table,
        day: day, 
        hour: hour
      })
    } catch (error) {
      return error
    }
  }

  async GetReserve (id: string) {

    try {
      return await axios.get(`${Url}/reserva/${id}`)
    } catch (error) {
      return error
    }


  }

async DeleteReserve () {

}

}

export default new ApiController();
