import axios from "axios"

// const baseUrl = "https://localhost:5001/nw/customer"
const baseUrl = "https://localhost:7284/nw/customer"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// uuden asiakkaan lisääminen
const create = newCustomer => {
    return axios.post(baseUrl, newCustomer)
}


export default { getAll, create }
