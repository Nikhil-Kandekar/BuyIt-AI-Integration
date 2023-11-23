import axios from "axios";

const apiDynamic = axios.create({
    baseURL:"http://127.0.0.1:8004/"
})

export default apiDynamic;