import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { readFile } from "@helpers/readFile"
import Loading from '../loading';
import { createContainer } from "../../pages/Tracker/_requests"
import toast from 'react-hot-toast';


function DropzoneWithoutKeyboard({ show, toggle }) {

    const [loadingFile, setLoadingFile] = useState(false)
    const [containers, setContainers] = useState([])
    

    const readFiles = async (file) => {
        setLoadingFile(true)
        const data = await readFile(file)
        const mapped = data
            .filter(d => d["REF"])
            .map(d => ({
                container: d["Contenedor"] || "",
                reference: d["REF"] || "",
                reference_alt: d["REF2"] || "",
                source: d["SOURCE"] || "",
                company: d["COMPANY"] || "",
                customer: d["Cliente"] || "",
                status: d["Status BPO"] || "",
                entry_number: d["Entry Number"] || "",
                close_date: d["Fecha de cierre"] || "",
                checkout_date: d["Salida de bodega"] || "",
                departure_data: d["Zarpe"] || "",
                arrival_date: d["Arribo"] || "",
                fda: d["FDA"] || "",
                cbp: d["CBP"] || "",
                usda: d["USDA"] || "",
                lfd: d["LFD"] || "",
                lfd_fee: d["LFD Fee"] || "",
                estimated_date: d["Estimada de Entrega"] || "",
                delivery_date: d["Fecha de Entrega"] || "",
                obs: d["OBS"] || "",
            }))
        setContainers(mapped)
        setLoadingFile(false)
    }

    function onHide() {
        setContainers([])
        toggle()
    }

    async function LoadData() {
        setLoadingFile(true)

        const queue = []
        for (const container of containers) {
            const query = createContainer(container)
            queue.push(query)
        }

        await toast.promise(
            Promise.allSettled(queue),
            {
                loading: 'Creando contenedores',
                success: 'Contendores creados exitosamente',
                error: 'Ocurrio un error'
            }
        )
        setLoadingFile(false)
        onHide()
    }
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        multiple: false,
        onDrop: files => readFiles(files),
        noKeyboard: true
    });



    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Subir Archivo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!!containers.length && <>
                    <div className='table-responsive table-overflow tableFixHead'>
                        <table className='table table-row-bordered fs-6 gy-5 table-hover'>
                            <thead>
                                <tr className="text-start text-gray-400 fw-bolder fs-6 text-uppercase gs-0">
                                    <th scope="col" className='mobile-th bg-white'>#</th>
                                    <th scope="col" className='mobile-th bg-white'>REF</th>
                                    <th scope="col" className='mobile-th bg-white'>REF2</th>
                                    <th scope="col" className='mobile-th bg-white'>Cliente</th>

                                </tr>
                            </thead>
                            <tbody className="fw-bold  tbody-container">

                                {containers.map((row, idx) => (
                                    <tr className='cursor-pointer' key={idx}>
                                        <th>{idx + 1}</th>

                                        <th>{row.reference}</th>
                                        <th>{row.reference_alt}</th>
                                        <th>{row.customer}</th>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>


                </>}
                {!containers.length && <section className="drop-container">
                    <div {...getRootProps({ className: 'dropzone icon-container' })}>
                        <input {...getInputProps()} />
                        <div className='icon-container'>
                            {loadingFile && <Loading />}

                            {!loadingFile &&
                                (<div className='text-center'>
                                    {acceptedFiles.length ? <>
                                        <i className="fa-solid fa-check drop-icon"></i>
                                        <div>{acceptedFiles[0].path} - {acceptedFiles[0].size} bytes</div>
                                    </> : <>
                                        <i className="fa-solid fa-file drop-icon"></i>
                                        <div className='my-2'>Presiona o suelta tu archivo aqui</div>
                                    </>}
                                </div>)
                            }
                        </div>
                    </div>
                </section>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onHide} disabled={loadingFile}>Cerrar</Button>
                {!!containers.length && <Button variant='primary' onClick={LoadData} disabled={loadingFile}>Agregar</Button>}

            </Modal.Footer>
        </Modal>
    );
}

export default DropzoneWithoutKeyboard
