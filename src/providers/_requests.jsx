import axios from "axios"

const env = import.meta.env

async function getUser(uid) {
    return axios.get(`${env.VITE_FIREBASE_API}/users/${uid}`)
}

export { getUser }