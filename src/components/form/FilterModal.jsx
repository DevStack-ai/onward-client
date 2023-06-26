import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from './SelectInput';
import { statusOptions } from "../../pages/Tracker/_helpers"
function FilterModal({ show, toggle, helpers }) {

    const [status, setStatus] = useState("")

    function onHide() {
        toggle()
    }

    const options = [
        "CERRADO - APROBADO POR EL CLIENTE",
        "STAND BY",
        "ANULADO",
        "EN PROCESO",
        "PROCESO TERMINADO",
        "TRANSITO TERR. A PTO.",
        "TRANSITO MARITIMO",
        "PUERTO DE DESTINO",
        "EN EXAMEN / HOLD",
        "LIBERADO",
        "EN PROCESO DE ENTREGA",
        "ENTREGADO",
        "PAGADO"
    ]

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="modal-dialog-centered h-auto"

            centered
        >
            <div className="container-xxl px-10 py-10">
                <div className=" py-2 d-flex justify-content-between align-items-center">
                    <h2 className="">
                        Filtros
                    </h2>
                    <div
                        className="btn btn-active-icon-primary btn-active-text-primary"
                        onClick={onHide}
                    >
                        <span className="svg-icon svg-icon-2"></span>
                        &#10006;
                    </div>
                </div>
                <div className="py-5">
                    <div className="row mb-4">
                        <div className="col-sm-12 col-lg-2 mb-4 mb-md-0">

                            <label className="pt-3 fw-bolder mb-4">
                                STATUS BPO
                            </label>

                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <div className="d-flex align-items-center position-relative mb-4">
                                <Select
                                    name="status"
                                    setValue={(name, value) => {
                                        setStatus(value)
                                        helpers.setFilter(name, value)
                                    }}
                                    value={status}
                                    options={statusOptions}
                                />

                            </div>
                        </div>
                    </div>

                </div>

                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={helpers.resetFilter}
                    >
                        Resetear
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onHide}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            onHide()
                            helpers.fetchData()
                        }}
                        disabled={!status}
                    >
                        Filtrar
                    </button>
                </div>
            </div>
        </Modal>
    )
}




export default FilterModal