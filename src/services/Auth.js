import axios from 'axios'

const url = "https://localhost:7284/nw/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth)
    return request.then(response => response)
}

export default { authenticate }
