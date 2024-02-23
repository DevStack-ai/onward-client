import React, { useCallback, useEffect, useState } from 'react'
import Dropzone from '@components/dropzone'
import TagsInput from '../../components/form/TagsInputs'
import { useAuth } from "../../providers"
import { getContainers, getTableContainers, getReport } from "./_requests"
import { useNavigate } from 'react-router-dom'
import { useTable } from '../../hooks/useTable'
import Table from '../../components/table'
import { Columns, defaultFilters } from "./_helpers"
import FilterModal from '../../components/form/FilterModal'
function Tracker() {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const [containers, setContainers] = useState([])

    const [downloadReport, setDownloadReport] = useState(false)
    const [dropzone, useDropzone] = useState(false)
    const [filters, setFilters] = useState(false)

    const { dataCount, dataList, helpers } = useTable({ fetch: getTableContainers })

    const toggleDropzone = () => useDropzone(!dropzone)
    const toggleFilter = () => setFilters(!filters)

    const queryData = async () => {
        helpers.setIsLoading(true)
        const query = await getContainers({ containers })
        const data = query.data.containers
        setData(data)
        helpers.setIsLoading(false)
    }

    async function generateFile() {
        setDownloadReport(true)
        const uids = dataList.map(d => d.uid)
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

    useEffect(() => {
        if (!dropzone) {
            helpers.fetchData()
        }
    }, [dropzone])

    return (<>
        <Dropzone show={dropzone} toggle={toggleDropzone} />
        <FilterModal show={filters} toggle={toggleFilter} helpers={helpers} />
        <div className='container-onward'>
            <h2 className='text-white'>CONTAINERS</h2>

            <div className='card-container '>

                <h6>Containers</h6>
                <div className={`card-header d-flex justify-content-between`}>
                    <div className="d-flex align-items-center col-lg-6 col-sm-12">
                        <TagsInput tags={containers} setTags={setContainers} />
                        <button
                            type="button"
                            className="btn btn-icon btn-secondary ms-3"
                            onClick={toggleFilter}
                        >
                            <span className="svg-icon svg-icon px-4">
                                <i class='bx bxs-filter-alt'></i>
                            </span>
                        </button>
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
                            onClick={containers.length ? queryData : helpers.fetchData}
                        >
                            <span className="svg-icon svg-icon px-4">
                                <i className='bx bx-search-alt-2' ></i>
                            </span>
                        </button>
                    </div>
                    <div className="card-toolbar ">
                        {!!dataList.length && <button className='btn btn-onward btn-secondary mx-2' onClick={generateFile} >
                            {downloadReport ? <>Downloading...</> : <><i className='bx bxs-file-export'></i> Download</>}

                        </button>}

                        {currentUser.role === "admin" && <button className='btn btn-onward btn-success' onClick={() => navigate("/containers/edit/new")} >Adding Container</button>}
                    </div>
                </div>

                <div className={`card-body`}>
                    <Table
                        columnList={Columns}
                        dataList={dataList}
                        dataCount={dataCount}
                        rowEvent={(row) => navigate(`/containers/details/${row.uid}`)}
                        {...helpers}
                    />
                </div>
            </div>
        </div>
    </>)
}


export default Tracker