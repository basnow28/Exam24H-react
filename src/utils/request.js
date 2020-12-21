import axios from "axios"

export default (url, options = { method : 'get' }) => {
    return axios({
        ...options,
        url
    }).then(response => response.data)
    .catch(error => {
        console.log('error: ' + url, error)
        throw error;
    })
}