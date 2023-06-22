import axios from "axios"

const env = import.meta.env

async function getUsers(options) {
    return axios.get(`${env.VITE_FIREBASE_API}/users`, options)
}
async function createUser(payload) {
    return axios.post(`${env.VITE_FIREBASE_API}/users`, payload)
}
async function updateUser(uid, payload) {
    return axios.put(`${env.VITE_FIREBASE_API}/users/${uid}`, payload)
}
async function deleteUser(uid) {
    return axios.delete(`${env.VITE_FIREBASE_API}/users/${uid}`)
}
export { getUsers, createUser, updateUser, deleteUser }


