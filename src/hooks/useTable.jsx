import React, { useState, useEffect, useRef, useCallback } from 'react'


export const useTable = ({
    fetch
}) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [total, setTotal] = useState(0)
    const [filters, setFilters] = useState({})

    const isMounted = useRef(true);



    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);


    const fetchData = useCallback(async () => {
        setIsLoading(true)
        const query = await fetch({ page, itemsPerPage, filters })
        const response = query.data
        setData(response.documents)
        setTotal(response.total)
        setIsLoading(false)
    }, [page, itemsPerPage])


    const setFilter = (field, value) => setFilters({ ...filters, [field]: value })
    const resetFilter = () => setFilters({})

    return {
        helpers: {
            isLoading,
            setIsLoading,
            fetchData,
            setPage,
            page,
            filters,
            setFilter,
            resetFilter
        },
        dataList: data,
        dataCount: total,
    }

}