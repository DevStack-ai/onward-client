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
export const Columns = [
    {
        title: "No.",
        accesor: "",
        cell: (row) => <td className='text-center'>{row.index + 1}</td>
    },
    {
        title: "email"
    },
    {
        title: "Rol",
        accesor: "role"
    },
    {
        title: "Acciones",
        className: 'actions-container text-center',
        cell: () => <>
            <div className='actions'>
                <span className="svg-icon svg-icon-lg px-4 text-muted">
                    <i className='bx bxs-chevron-right' ></i>
                </span>
            </div>
        </>
    }
]