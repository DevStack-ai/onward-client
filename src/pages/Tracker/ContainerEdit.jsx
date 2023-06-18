import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/loading'
import { CreateSchema, EditSchema, defaultValues } from './_helpers'
import { Formik, Form } from 'formik';
import { FormikField } from '../../components/form/FormikField';
import { getContainer, updateContainer, deleteContainer, createContainer } from './_requests'

function ContainerEdit() {

    const navigate = useNavigate()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [document, setDocument] = useState({})

    const uid = params.id
    const fetch = useCallback(async () => {
        if (uid && uid !== "new") {
            setIsLoading(true);
            const query = await getContainer(uid)
            const response = query.data
            setDocument(response)
        }
        setIsLoading(false);
    }, [uid])

    useEffect(() => {
        fetch()
    }, [])

    async function deleteDocument() {
        try {
            await deleteContainer(document.uid)
            navigate("/containers")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container '>
            <h2 className='text-white'>{document.uid ? "Editar" : "Crear"} Contenedor</h2>
            <div className='card '>

                <div className={`card-body `}>
                    <div >
                        {isLoading && <Loading />}
                        {!isLoading && (
                            <>
                                <Formik
                                    initialValues={document.uid ? document : defaultValues}
                                    validationSchema={document.uid ? EditSchema : CreateSchema}
                                    onSubmit={async values => {
                                        try {
                                            console.log("values", values)
                                            if (document.uid) {
                                                await updateContainer(document.uid, values)
                                            } else {
                                                await createContainer(values)
                                            }
                                            navigate("/containers")
                                        } catch (err) {
                                            console.log(err)
                                        }
                                    }}
                                >
                                    {({ errors, touched, isSubmitting }) => (
                                        <Form className="form mb-8">
                                            <div className=' d-flex flex-column justify-content-between '>
                                                <div className="row mb-6 px-0 ms-0 ">
                                                    <label className={`col-sm-12 col-lg-2 col-form-label required fw-bold fs-6`}>
                                                        Contenedor
                                                    </label>
                                                    <div className="col-sm-12 col-lg-10">
                                                        <FormikField
                                                            type="text"
                                                            name="container"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        REF
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="reference"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        REF2
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="reference_alt"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        SOURCE
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="source"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        COMPANY
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="company"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        Cliente
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="customer"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        Status BPO
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="status"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>

                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        Fecha de cierre
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="date"
                                                            name="close_date"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        Salida de bodega
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="date"
                                                            name="checkout_date"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        Zarpe
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="date"
                                                            name="departure_data"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        Arribo
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="date"
                                                            name="arrival_date"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        Entry Number
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="entry_number"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        FDA
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="fda"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        CBP
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="cbp"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        USDA
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="usda"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        LFD
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="lfd"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        LFD Fee
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="lfd_fee"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        Estimada de Entrega
                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="date"
                                                            name="estimated_date"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        Fecha de Entrega

                                                    </label>
                                                    <div className="col-sm-12 col-lg-4 mt-4">
                                                        <FormikField
                                                            type="date"
                                                            name="delivery_date"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4`}>
                                                        OBS

                                                    </label>
                                                    <div className="col-sm-12 col-lg-10 mt-4">
                                                        <FormikField
                                                            type="text"
                                                            name="obs"
                                                            errors={errors}
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='mt-5'>
                                                    <div className='d-flex justify-content-between flex-row-reverse'>
                                                        <div className='gap-2'>
                                                            <button className='btn btn-onward btn-secondary mx-2' onClick={() => navigate("/containers")} >Cancelar</button>
                                                            <button type="submit" className='btn btn-onward btn-success' disabled={isSubmitting}   >
                                                                {isSubmitting && <Loading />}
                                                                {!isSubmitting && document.uid ? "Editar" : "Crear"}
                                                            </button>
                                                        </div>
                                                        {document.uid && <button className='btn btn-onward btn-danger' onClick={deleteDocument} >Eliminar</button>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>


                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContainerEdit