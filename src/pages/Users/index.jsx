import React, { useEffect } from 'react'
import { getUsers } from './_requests'

import { useNavigate } from 'react-router-dom'
import { useTable } from '../../hooks/useTable'
import { Columns } from "./_helpers"
import Table from '../../components/table'

function Users() {

    const navigate = useNavigate()

    const { dataCount, dataList, helpers } = useTable({ fetch: getUsers })
    useEffect(() => {
        helpers.fetchData()
    }, [])

    return (
        <div className='container-onward'>
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
                    <Table
                        columnList={Columns}
                        dataList={dataList}
                        dataCount={dataCount}
                        rowEvent={(row) => navigate(`/users/${row.uid}`)}
                        {...helpers}
                    />
                </div>
            </div>
        </div>
    )
}

export default Users