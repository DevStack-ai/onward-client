import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/loading'

import { getContainer, getReport } from './_requests'
import { useAuth } from '../../providers';

function ContainerDetails() {

    const navigate = useNavigate()
    const params = useParams()
    const { currentUser } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [document, setDocument] = useState({})
    const [downloadReport, setDownloadReport] = useState(false)

    const uid = params.id
    const fetch = useCallback(async () => {
        if (uid) {
            setIsLoading(true);
            const query = await getContainer(uid)
            const response = query.data
            setDocument(response)
            setIsLoading(false);
        }
    }, [uid])

    useEffect(() => {
        fetch()
    }, [])

    async function generateFile() {
        setDownloadReport(true)

        const response = await getReport({ containers: [uid] })
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

    return (
        <div className='container '>
            <h2 className='text-white'> Contenedor {document.ContainerNumber}</h2>
            <div className='card '>

                <div className={`card-body `}>
                    <div >
                        {isLoading && <Loading />}
                        {!isLoading && (
                            <>

                                <div className=' d-flex flex-column justify-content-between '>
                                    <div className='mb-5'>
                                        <div className='d-flex justify-content-between flex-row-reverse'>
                                            <div className='gap-2'>
                                                <button className='btn btn-icon btn-secondary mx-2' onClick={() => navigate("/containers")} ><i class='bx bx-left-arrow-alt'></i></button>
                                                <button className='btn btn-icon btn-success mx-2' onClick={generateFile} >
                                                    {downloadReport ? <Loading /> : <i class='bx bxs-file-export'></i>}
                                                </button>
                                                {currentUser.role === "admin" &&
                                                    <span className='btn btn-onward btn-primary mx-2' onClick={() => navigate(`/containers/edit/${uid}`)} >
                                                        <i class='bx bxs-edit' ></i>
                                                        Editar
                                                    </span>}



                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-6 px-0 ms-0 ">
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6`}>
                                            Contenedor
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-10">
                                            {document.container || "-"}
                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            REF
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.reference || "-"}


                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            REF2
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.reference_alt || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            SOURCE
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.source || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            COMPANY
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.company || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Cliente
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.customer || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Status BPO
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.status || "-"}

                                        </div>

                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Fecha de cierre
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.close_date || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Salida de bodega
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.checkout_date || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Zarpe
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.departure_data || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Arribo
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.arrival_date || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Entry Number
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.entry_number || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            FDA
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.fda || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            CBP
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.cbp || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            USDA
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.usda || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            LFD
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.lfd || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            LFD Fee
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.lfd_fee || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Estimada de Entrega
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.estimated_date || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Fecha de Entrega

                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {document.delivery_date || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            OBS

                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-10 mt-4">
                                            {document.obs || "-"}

                                        </div>
                                    </div>

                                </div>


                            </>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ContainerDetails