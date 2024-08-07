import axios from 'Axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3003/api',
})

const loginService = async (credentials)=>{
  try{
   return(
       await axiosInstance.post('/login/',credentials)              
   )
  }catch(error) {
   console.error('Error in login:', error)
   throw error
 }
}


export default  loginService 