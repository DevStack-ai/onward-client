import axios from "axios"

const env = import.meta.env

async function getContainers(options) {
    return axios.post(`${env.VITE_FIREBASE_API}/containers`, options)
}
async function getTableContainers(options) {
    return axios.post(`${env.VITE_FIREBASE_API}/containers/table`, options)
}
async function createContainer(options) {
    return axios.post(`${env.VITE_FIREBASE_API}/containers/create`, options)
}
async function getContainer(uid) {
    return axios.get(`${env.VITE_FIREBASE_API}/containers/${uid}`)
}
async function updateContainer(uid, options) {
    return axios.put(`${env.VITE_FIREBASE_API}/containers/${uid}`, options)
}
async function deleteContainer(uid) {
    return axios.delete(`${env.VITE_FIREBASE_API}/containers/${uid}`)
}
async function getReport(options) {
    const url = `${env.VITE_FIREBASE_API}/containers/export`
    return axios({ url: url, method: 'POST', data: options, responseType: 'blob' })

}


export { getContainers, getReport, getContainer, updateContainer, deleteContainer, createContainer, getTableContainers }