import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (uusiHenkilo) => {
    const request = axios.post(baseUrl, uusiHenkilo)
    return request.then(response => response.data)
}

const update = (id, uusiHenkilo) => {
    const request = axios.put(`${baseUrl}/${id}`, uusiHenkilo)
    return request.then(response => response.data)
}

const poista = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, poista }
