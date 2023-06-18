import * as Yup from 'yup';

export const EditSchema = Yup.object().shape({
    role: Yup.string(),
});
export const CreateSchema = Yup.object().shape({
    email: Yup.string().email("Formato invalido").required('Campo Obligatorio'),
    password: Yup.string().min(8, "Longitud minima 8 digitos").required('Campo Obligatorio'),
    role: Yup.string(),
});
export const defaultValues = {
    email: "",
    password: "",
    role: "user"
}
export const roles = ["user", "admin"]