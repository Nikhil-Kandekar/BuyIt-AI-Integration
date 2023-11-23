import axios from "axios";

const apiFake = axios.create({
    baseURL:"http://127.0.0.1:8002/"
})

export default apiFake;