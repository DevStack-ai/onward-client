import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/loading'

import { getHistory, getReportHistory } from './_requests'
import { useAuth } from '../../providers';
import moment from "moment"

function ContainerDetails() {

    const navigate = useNavigate()
    const params = useParams()
    const { currentUser } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [container, setDocument] = useState({})
    const [downloadReport, setDownloadReport] = useState(false)

    const uid = params.id
    const fetch = useCallback(async () => {
        if (uid) {
            setIsLoading(true);
            const query = await getHistory(uid)
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

        const response = await getReportHistory({ containers: [uid] })
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
            <h2 className='text-white'> Contenedor {container.ContainerNumber || container.container}</h2>
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
                                                <button className='btn btn-icon btn-secondary mx-2' onClick={() => navigate("/history")} ><i className='bx bx-left-arrow-alt'></i></button>
                                                <button className='btn btn-icon btn-success mx-2' onClick={generateFile} >
                                                    {downloadReport ? <Loading /> : <i className='bx bxs-file-export'></i>}
                                                </button>
                                                {currentUser.role === "admin" &&
                                                    <span className='btn btn-onward btn-primary mx-2' onClick={() => navigate(`/history/edit/${uid}`)} >
                                                        <i className='bx bxs-edit' ></i>
                                                        Editar
                                                    </span>}



                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-6 px-0 ms-0 ">
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6`}>
                                            Contenedor
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.container || "-"}
                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6`}>
                                            Doc No
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.docto_no || "-"}
                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            REF
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.reference || "-"}


                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            REF2
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.reference_alt || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            SOURCE
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.source || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            COMPANY
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.company || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Cliente
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.customer || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Status BPO
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.status_bpo || "-"}

                                        </div>

                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Fecha de cierre
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.close_date ? moment(container.close_date).format("MMMDDYYYY").toUpperCase() : "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Salida de bodega
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.checkout_date ? moment(container.checkout_date).format("MMMDDYYYY").toUpperCase() : "-"}


                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Zarpe
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.departure_data ? moment(container.departure_data).format("MMMDDYYYY").toUpperCase() : "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Arribo
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.arrival_date ? moment(container.arrival_date).format("MMMDDYYYY").toUpperCase() : "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Entry Number
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.entry_number || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            FDA
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.fda || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            CBP
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.cbp || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            USDA
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.usda || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            LFD
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.lfd || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            LFD Fee
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.lfd_fee || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Estimada de Entrega
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.estimated_date ? moment(container.estimated_date).format("MMMDDYYYY").toUpperCase() : "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Fecha de Entrega

                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.delivery_date ? moment(container.delivery_date).format("MMMDDYYYY").toUpperCase() : "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            OBS

                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-10 mt-4">
                                            {container.obs || "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            BPO LiveMapUrl
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.bpo_livemapurl ? <a href={container.bpo_livemapurl} target='_blank'>Map</a> : "-"}

                                        </div>
                                        <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                            Total Amount
                                        </label>
                                        <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                            {container.total_amount || "-"}
                                        </div>
                                    </div>
                                    {container.ContainerNumber && <>
                                        <div className='separator'></div>
                                        <div className="row mb-6 px-0 ms-0 ">
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                ContainerNumber
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.ContainerNumber || "-"}
                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                Message
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.Message || "-"}
                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                Status
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.Status || "-"}
                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                StatusId
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.StatusId || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                ReferenceNo
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.ReferenceNo || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                BLReferenceNo
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.BLReferenceNo || "-"}

                                            </div>

                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                ShippingLine
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.ShippingLine || "-"}

                                            </div>

                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                FromCountry
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.FromCountry || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                Pol
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.Pol || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                ToCountry
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.ToCountry || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                Pod
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.Pod || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                Vessel
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.Vessel || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                VesselIMO
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.VesselIMO || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                GateOutDate
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.GateOutDate || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                FormatedTransitTime
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.FormatedTransitTime || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                FirstETA
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.FirstETA || "-"}

                                            </div>
                                            <label className={`fw-bold col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                LiveMapUrl
                                            </label>
                                            <div className="text-muted pt-3 fw-bold col-sm-12 col-lg-4 mt-4">
                                                {container.LiveMapUrl ? <a href={container.LiveMapUrl} target='_blank'>Map</a> : "-"}

                                            </div>

                                        </div>
                                    </>

                                    }
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