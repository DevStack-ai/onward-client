import React, { useCallback, useEffect, useState } from 'react'
import Dropzone from '@components/dropzone'
import { readFile } from "@helpers/readFile"
import TagsInput from '../../components/form/TagsInputs'
import Loading from "@components/loading/dark"
import { useAuth } from "../../providers"
import { getContainers, getAllContainers, getReport } from "./_requests"
import { useNavigate } from 'react-router-dom'
import moment from "moment"
function Tracker() {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const [containers, setContainers] = useState([])
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [downloadReport, setDownloadReport] = useState(false)
    const [dropzone, useDropzone] = useState(false)
    const toggleDropzone = () => useDropzone(!dropzone)


    const readFiles = async (file) => {
        const data = await readFile(file)
        const rows = data.map(row => row[0])
        const containers = rows.filter(row => row)
        const clean = containers.map(container => container.replace(/[^a-zA-Z0-9]/g, ''));
        setContainers(clean)
        toggleDropzone()
    }

    const fetchData = async () => {

        setIsLoading(true)
        const query = await getContainers({ containers })
        const data = query.data.containers
        setData(data)
        setIsLoading(false)
    }


    async function generateFile() {
        setDownloadReport(true)
        const uids = data.map(d => d.uid)
        const unique = [...new Set([...containers, ...uids].filter(d => !!d))]
        const response = await getReport({ containers: unique })
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        // link.target = '_blank'
        link.setAttribute("download", `reporte.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadReport(false)

    }
    const fetchAllData = useCallback(async () => {
        if (currentUser.role === "admin") {
            setIsLoading(true)
            const query = await getAllContainers()
            const data = query.data.documents
            setData(data)
            setIsLoading(false)
        }
    }, [currentUser])

    useEffect(() => {
        fetchAllData()
    }, [])

    return (<>
        <Dropzone show={dropzone} toggle={toggleDropzone} handleChange={readFiles} />
        <div className='container'>
            <h2 className='text-white'>Contenedores</h2>

            <div className='card-container '>

                <h6>Contenedores</h6>
                <div className={`card-header d-flex justify-content-between`}>
                    <div className="d-flex align-items-center col-lg-6 col-sm-12">
                        <TagsInput tags={containers} setTags={setContainers} />
                        <button
                            type="button"
                            className="btn btn-icon btn-secondary ms-3"
                            onClick={toggleDropzone}
                        >
                            <span className="svg-icon svg-icon px-4">
                                <i className='bx bxs-file-import' ></i>
                            </span>
                        </button>
                        <button
                            type="button"
                            className="btn btn-icon btn-primary ms-3"
                            onClick={fetchData}
                        >
                            <span className="svg-icon svg-icon px-4">
                                <i class='bx bx-search-alt-2' ></i>
                            </span>
                        </button>
                    </div>
                    <div className="card-toolbar ">
                        {!!data.length && <button className='btn btn-onward btn-secondary mx-2' onClick={generateFile} >
                            {downloadReport ? <>Descargando...</> : <><i class='bx bxs-file-export'></i> Descargar</>}

                        </button>}

                        {currentUser.role === "admin" && <button className='btn btn-onward btn-success' onClick={() => navigate("/containers/edit/new")} >Agregar Contenedor</button>}
                    </div>
                </div>

                <div className={`card-body`}>
                    <div >
                        <div className='table-responsive table-overflow tableFixHead'>
                            <table className='table table-row-bordered fs-6 gy-5 table-hover'>
                                <thead>
                                    <tr className="text-start text-gray-400 fw-bolder fs-6 text-uppercase gs-0">
                                        <th scope="col" className='mobile-th bg-white'>Contenedor</th>
                                        <th scope="col" className='mobile-th bg-white'>Fecha de cierre</th>
                                        <th scope="col" className='mobile-th bg-white'>Salida de bodega</th>
                                        <th scope="col" className='mobile-th bg-white'>Zarpe</th>
                                        <th scope="col" className='mobile-th bg-white'>Arribo</th>
                                        <th scope="col" className='mobile-th bg-white text-center'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="fw-bold  tbody-container">
                                    {isLoading &&
                                        (<tr className='text-center '>
                                            <th colSpan='8'><Loading /></th>
                                        </tr>)}
                                    {(!isLoading && !data.length) &&
                                        (<tr className='text-center '>
                                            <th colSpan='8'>No hay datos</th>
                                        </tr>)}
                                    {data.map((row, idx) => (
                                        <tr className='cursor-pointer' key={idx}>
                                            <th>{row.ContainerNumber}</th>
                                            <th>{row.LoadingDate?.Date}</th>
                                            <th>{row.DepartureDate?.Date}</th>
                                            <th>{row.DischargeDate?.Date}</th>
                                            <th>{row.ArrivalDate?.Date}</th>

                                            <td className='actions-container text-center' onClick={() => navigate(`/containers/details/${row.uid}`)}>
                                                <div className='actions'>
                                                    <span className="svg-icon svg-icon-lg px-4 text-muted">
                                                        <i className='bx bxs-chevron-right' ></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>)
}


export default Tracker