import React from 'react'
import { useMemo } from 'react'
import Pagination from "@components/table/pagination"
import Loading from "@components/loading"


function Table({
    columnList,
    dataList,
    dataCount,
    isLoading,
    page,
    setPage,
    rowEvent
}) {

    const columns = useMemo(() => columnList)
    const getIndeex = (idx) => ((page - 1) * 10) + idx
    return <>
        <div>
            <div className='table-responsive'>
                <table className='table table-row-bordered table-striped table-hover '>
                    <thead className>
                        <tr className="text-start fw-bolder fs-6 text-uppercase gs-0">
                            {columns.map((column, idx) => (<th key={idx} className={`middle text-center ${column.className}"`} style={column.headerStyle ? column.headerStyle : {}}>{column.title}</th>))}
                        </tr>
                    </thead>
                    <tbody className="fw-bold tbody-container">
                        {isLoading &&
                            (<tr className='text-center '>
                                <th colSpan='8'><Loading /></th>
                            </tr>)}
                        {(!isLoading && !dataList.length) &&
                            (<tr className='text-center '>
                                <th colSpan='8'>No hay datos</th>
                            </tr>)}
                        {dataList.map((row, idx) => (
                            <tr className='cursor-pointer' key={idx} onClick={() => rowEvent(row)}>
                                {columns.map((column) => {
                                    if (column.cell) return column.cell({ ...row, index: getIndeex(idx), value: row[column.accesor || column.title] })
                                    return <td className={column.className || ''}>
                                        {row[column.accesor || column.title]}
                                    </td>

                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className='d-flex justify-content-end'>
                <Pagination
                    className="pagination-bar"
                    currentPage={page}
                    totalCount={dataCount}
                    pageSize={10}
                    onPageChange={setPage} />
            </div>
        </div>
    </>
}

export default Table