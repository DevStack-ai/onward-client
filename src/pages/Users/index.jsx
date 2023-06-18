import React, { useCallback, useEffect, useState } from 'react'
import { getUsers } from './_requests'
import Loading from "@components/loading"
import Pagination from "@components/table/pagination"
import { useNavigate } from 'react-router-dom'

function Users() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [documents, setDocuments] = useState([])
    const [page, setPage] = useState(1)
    const [itemsPerPage,] = useState(5)
    const [total, setTotal] = useState(0)


    const fetch = useCallback(async () => {
        setIsLoading(true);
        const query = await getUsers({ page, itemsPerPage })
        const response = query.data
        setDocuments(response.documents)
        setTotal(response.total)

        setIsLoading(false);

    }, [page, itemsPerPage])

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className='container'>
            <h2 className='text-white'>Usuarios</h2>
            <div className='card-container'>
                <h6>Buscar</h6>
                <div className={`card-header row `}>
                    <div className="d-flex align-items-center col-lg-4 col-md-8 col-sm-12 mt-2">
                        <input
                            type="text"
                            className="form-control form-control-solid"
                            placeholder='Buscar por email'
                            name="email"
                        />
                        <button
                            type="button"
                            className="btn btn-icon btn-primary ms-3"
                            onClick={fetch}
                        >
                            <span className="svg-icon svg-icon px-4">
                                <i className='bx bx-refresh bx-icon'></i>
                            </span>
                        </button>

                    </div>
                    <div className="card-toolbar col d-flex justify-content-end mt-2">
                        <button className='btn btn-onward btn-success' onClick={() => navigate(`/users/new`)} >Agregar usuario</button>
                    </div>
                </div>
                <div className={`card-body`}>
                    <div >
                        <div className='table-responsive table-overflow tableFixHead'>
                            <table className='table table-row-bordered fs-6 gy-5 table-hover'>
                                <thead>
                                    <tr className="text-start text-gray-400 fw-bolder fs-6 text-uppercase gs-0">
                                        <th scope="col" className='mobile-th bg-white'>Email</th>
                                        <th scope="col" className='mobile-th bg-white'>Rol</th>
                                        <th scope="col" className='mobile-th bg-white text-center'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="fw-bold  tbody-container">
                                    {isLoading &&
                                        (<tr className='text-center '>
                                            <th colSpan='8'><Loading /></th>
                                        </tr>)}
                                    {(!isLoading && !documents.length) &&
                                        (<tr className='text-center '>
                                            <th colSpan='8'>No hay datos</th>
                                        </tr>)}
                                    {documents.map((row, idx) => (
                                        <tr className='cursor-pointer' key={idx}>
                                            <th>{row.email}</th>
                                            <td>{row.role}</td>
                                            <td className='actions-container text-center' onClick={() => navigate(`/users/${row.uid}`)}>
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
        </div>
    )
}

export default Users