import React, { useCallback, useEffect, useState } from 'react'
import Dropzone from '@components/dropzone'
import { readFile } from "@helpers/readFile"
import TagsInput from '../../components/form/TagsInputs'
import Loading from "@components/loading"
import { useAuth } from "../../providers"
import { getContainers, getTableContainers, getReport } from "./_requests"
import { useNavigate } from 'react-router-dom'
import Pagination from "@components/table/pagination"

function Tracker() {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const [containers, setContainers] = useState([])
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [downloadReport, setDownloadReport] = useState(false)
    const [dropzone, useDropzone] = useState(false)
    const [page, setPage] = useState(1)
    const [itemsPerPage,] = useState(10)
    const [total, setTotal] = useState(0)



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
        setIsLoading(true)
        const query = await getTableContainers({ page, itemsPerPage })
        const response = query.data
        setData(response.documents)
        setTotal(response.total)
        setIsLoading(false)
    }, [page, itemsPerPage])

    useEffect(() => {
        fetchAllData()
    }, [page])

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
                            onClick={containers.length ? fetchData : fetchAllData}
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
                                        <th scope="col" className='mobile-th bg-white'>REF</th>
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
                                            <th>{row.reference}</th>
                                            <th>{row.close_date}</th>
                                            <th>{row.checkout_date}</th>
                                            <th>{row.departure_data}</th>
                                            <th>{row.arrival_date}</th>

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
                        <div className='d-flex justify-content-end'>

                            <Pagination
                                className="pagination-bar"
                                currentPage={page}
                                totalCount={total}
                                pageSize={itemsPerPage}
                                onPageChange={page => setPage(page)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}


export default Tracker