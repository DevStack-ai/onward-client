import React, { useCallback, useEffect, useState } from 'react'
import { getUser } from '../../providers/_requests'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/loading'
import { CreateSchema, EditSchema, defaultValues, roles } from './_helpers'
import { Formik, Form } from 'formik';
import { FormikField } from '../../components/form/FormikField';
import { createUser, updateUser, deleteUser } from './_requests'
import toast from 'react-hot-toast';

function UsersDetails() {

    const navigate = useNavigate()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [document, setDocument] = useState({})

    const uid = params.id
    const fetch = useCallback(async () => {
        if (uid && uid !== "new") {
            setIsLoading(true);
            const query = await getUser(uid)
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
            await toast.promise(
                deleteUser(document.uid),
                {
                    pending: 'Eliminando',
                    success: 'Usuario eliminado',
                    error: 'Ocurrio un error'
                }
            )

            navigate("/users")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container '>
            <h2 className='text-white'>{document.uid ? "Editar" : "Crear"} Usuario</h2>
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
                                            const action = !document.uid ?
                                                () => createUser(values)
                                                : () => updateUser(document.uid, values)

                                            console.log("values", values)

                                            await toast.promise(
                                                action(),
                                                {
                                                    pending: `${document.uid ? "Editando" : "Creando"}`,
                                                    success: `${document.uid ? "Editado" : "Creado"} exitosamente`,
                                                    error: 'Ocurrio un error'
                                                }
                                            )

                                            navigate("/users")
                                        } catch (err) {
                                            console.log(err)
                                        }
                                    }}
                                >
                                    {({ errors, touched, values, isSubmitting, handleChange, handleSubmit }) => (
                                        <Form className="form mb-8">
                                            <div className=' d-flex flex-column justify-content-between '>
                                                <div className="row mb-6 px-0 ms-0 ">
                                                    <label className={`col-sm-12 col-lg-2 col-form-label ${!document.uid ? "required" : ''} fw-bold fs-6`}>
                                                        Email
                                                    </label>
                                                    <div className="col-sm-12 col-lg-10">
                                                        <FormikField
                                                            type="email"
                                                            name="email"
                                                            errors={errors}
                                                            placeholder="email"
                                                            fieldStyle="solid"
                                                            touched={touched}
                                                            disabled={document.uid}
                                                        />
                                                    </div>
                                                    {!document.uid &&
                                                        <>
                                                            <label className={`col-sm-12 col-lg-2 col-form-label ${!document.uid ? "required" : ''} fw-bold fs-6`}>
                                                                Contraseña
                                                            </label>
                                                            <div className="col-sm-12 col-lg-10">
                                                                <FormikField
                                                                    type="password"
                                                                    name="password"
                                                                    placeholder="Contraseña"
                                                                    fieldStyle="solid"
                                                                    errors={errors}
                                                                    touched={touched}
                                                                />
                                                            </div>
                                                        </>}
                                                    <label className={`col-sm-12 col-lg-2 col-form-label ${!document.uid ? "required" : ''} fw-bold fs-6 `}>
                                                        Rol
                                                    </label>
                                                    <div className="col-sm-12 col-lg-10">
                                                        <select
                                                            className="form-select form-select-solid fw-bolder"
                                                            name="role"
                                                            value={values.role}
                                                            onChange={handleChange}
                                                        >
                                                            {roles.map((option, key) => (
                                                                <option value={option} key={key}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='mt-5'>
                                                    <div className='d-flex justify-content-between flex-row-reverse'>
                                                        <div className='gap-2'>
                                                            <button type="button" className='btn btn-onward btn-secondary mx-2' onClick={() => navigate("/users")} >Cancelar</button>
                                                            <button type="submit" className='btn btn-onward btn-success' disabled={isSubmitting} onClick={handleSubmit}  >
                                                                {isSubmitting && <Loading />}
                                                                {!isSubmitting && document.uid ? "Editar" : "Crear"}
                                                            </button>
                                                        </div>
                                                        {document.uid && <button type="button" className='btn btn-onward btn-danger' onClick={deleteDocument} >Eliminar</button>}
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

export default UsersDetails