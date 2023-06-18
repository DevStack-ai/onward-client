import * as Yup from 'yup';

export const Schema = Yup.object().shape({
    email: Yup.string().email("Formato invalido").required('Campo Obligatorio'),
    password: Yup.string().required('Campo Obligatorio'),

});
export const initialValue = {
    email: '',
    password: '',
}