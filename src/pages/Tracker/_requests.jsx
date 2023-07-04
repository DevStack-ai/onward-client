import axios from "axios"

const env = import.meta.env

export async function getContainers(options) {
    return axios.post(`${env.VITE_FIREBASE_API}/containers`, options)
}
export async function getTableContainers(options) {
    return axios.post(`${env.VITE_FIREBASE_API}/containers/table`, options)
}
export async function getAllContainers() {
    return axios.post(`${env.VITE_FIREBASE_API}/containers/all`)
}
export async function createContainer(options) {
    return axios.post(`${env.VITE_FIREBASE_API}/containers/create`, options)
}
export async function getContainer(uid) {
    return axios.get(`${env.VITE_FIREBASE_API}/containers/${uid}`)
}
export async function updateContainer(uid, options) {
    return axios.put(`${env.VITE_FIREBASE_API}/containers/${uid}`, options)
}
export async function deleteContainer(uid) {
    return axios.delete(`${env.VITE_FIREBASE_API}/containers/${uid}`)
}
export async function getReport(options) {
    const url = `${env.VITE_FIREBASE_API}/containers/export`
    return axios({ url: url, method: 'POST', data: options, responseType: 'blob' })

}

export async function getHistories(options) {
    return axios.post(`${env.VITE_FIREBASE_API}/history`, options)
}
export async function getTableHistory(options) {
    return axios.post(`${env.VITE_FIREBASE_API}/history/table`, options)
}
export async function getAllHistory() {
    return axios.post(`${env.VITE_FIREBASE_API}/history/all`)
}
export async function createHistory(options) {
    return axios.post(`${env.VITE_FIREBASE_API}/history/create`, options)
}
export async function getHistory(uid) {
    return axios.get(`${env.VITE_FIREBASE_API}/history/${uid}`)
}
export async function updateHistory(uid, options) {
    return axios.put(`${env.VITE_FIREBASE_API}/history/${uid}`, options)
}
export async function deleteHistory(uid) {
    return axios.delete(`${env.VITE_FIREBASE_API}/history/${uid}`)
}
export async function getReportHistory(options) {
    const url = `${env.VITE_FIREBASE_API}/history/export`
    return axios({ url: url, method: 'POST', data: options, responseType: 'blob' })

}



