import axios from "axios";

const apiRecommend = axios.create({
    baseURL:"http://127.0.0.1:8005/"
})

export default apiRecommend;