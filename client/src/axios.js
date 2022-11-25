import Axios from 'axios'
const instance = Axios.create({
    baseURL: 'https://itdatabase-production.up.railway.app/'
})

export default instance