import React, { useState } from 'react'
import Dropzone from '@components/dropzone'
import { readFile } from "@helpers/readFile"
import { createFile } from "@helpers/createFile"

import axios from 'axios'
const env = import.meta.env
function Tracker() {

    const [containers, setContainers] = useState('')

    const readFiles = async (file) => {
        const data = await readFile(file)
        const rows = data.map(row => row[0])
        const containers = rows.filter(row => row)
        const clean = containers.map(container => container.replace(/[^a-zA-Z0-9]/g, ''));
        const join = clean.join('\n')
        console.log(join)
        setContainers(join)
    }
    const fetchData = async () => {


        const ids = containers.split("\n")
        const queries = []
        for(const id of ids){
            const query = axios.get(`${env.VITE_URL_API}?authCode=${env.VITE_AUTH_CODE}&requestId=${id}`)
            queries.push(query)
        }

        const result = await Promise.allSettled(queries)
        const fulfilled = result.filter(q => q.status === "fulfilled")
        const data = fulfilled.map(q => q.value.data[0])
        createFile(data)
    }
    return (<>

        <div className='container'>
            <div className='card-container '>
                <div className='p-5'>
                    <div className='row py-5'>
                        <div className='col-lg-6 col-sm-12'>
                            <h5>
                                Subir archivo
                            </h5>
                            <div className='pt-2'>

                                <Dropzone handleChange={readFiles} />
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            <h5>
                                Contenedores
                            </h5>
                            <div className='pt-2'>
                                <textarea rows={15}  placeholder='Ingresa aqui tu numero de contenedor' value={containers} onChange={(ev) => setContainers(ev.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='btn btn-onward' disabled={!containers.length} onClick={fetchData}>Consultar</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}


export default Tracker