import axios from "axios"

const instance = axios.create({
    baseURL:'https://zap-shift-server-topaz.vercel.app'
})

const useAxios = ()=>{
 return instance;
}

export default useAxios;