import axios from "axios"

// const baseUrl = "https://localhost:5001/nw/customer"
const baseUrl = "https://localhost:7284/nw/users"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// uuden käyttäjän lisääminen
const create = newUser => {
    return axios.post(baseUrl, newUser)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, object) => {
    return axios.put(`${baseUrl}/${id}`, object)
}

export default { getAll, create, remove, update }
