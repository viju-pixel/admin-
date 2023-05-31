import axios from 'axios';
export default axios.create({
    baseURL:"http://localhost:5000/call",
    headers:{
        "Content-type":"application/json"
    }
})