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

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = object => {
    return axios.put(`${baseUrl}/${object.customerId}`, object)
}

export default { getAll, create, remove, update }
