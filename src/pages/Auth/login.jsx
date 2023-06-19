import { FormikField } from '../../components/form/FormikField';
import { initialValue, Schema } from './helpers'
import Loading from '../../components/loading';
import { useAuth } from '../../providers';
import { Formik, Form } from 'formik';
import React from 'react'

import logo from "@assets/images/logo.png"
import toast from 'react-hot-toast';

function Login() {

    const auth = useAuth()


    return (<>
        <div className='d-flex justify-content-center'>
            <img src={logo} width="350px" className='pt-4 pb-2' />
        </div>
        <div className='container d-flex justify-content-center'>
            <div className='login-container  p-5'>
                <div className='p-5'>
                    <h2>¡Bienvenido!</h2>
                    <div className='pt-5'>
                        <Formik
                            initialValues={initialValue}
                            validationSchema={Schema}
                            onSubmit={async values => {
                                try {
                                    await toast.promise(
                                        auth.login(values.email, values.password),
                                        {
                                            pending: 'Ingresando',
                                            success: 'Bienvenido',
                                            error: 'Credenciales incorrectas'
                                        }
                                    )
                                } catch (err) {

                                    console.log(err)
                                }
                            }}
                        >
                            {({ errors, touched, isSubmitting }) => (
                                <Form className='form-container'>
                                    <FormikField
                                        type="email"
                                        name="email"
                                        label='Usuario'
                                        placeholder="Usuario"
                                        fieldStyle="solid"
                                        errors={errors}
                                        touched={touched}
                                    />

                                    <FormikField
                                        type="password"
                                        name="password"
                                        label='Contraseña'
                                        placeholder="Contraseña"
                                        fieldStyle="solid"
                                        errors={errors}
                                        touched={touched}
                                    />
                                    <div className='text-center pb-2 pt-5'>

                                        <button type="submit" className='btn btn-onward' >
                                            {!isSubmitting ? "Ingresar" : <Loading />}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Login