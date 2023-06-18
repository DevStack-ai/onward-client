import * as Yup from 'yup';

export const EditSchema = Yup.object().shape({
    container: Yup.string().required('Campo Obligatorio'),
});
export const CreateSchema = Yup.object().shape({
    container: Yup.string().required('Campo Obligatorio'),
 
});
export const defaultValues = {
    container: "",
    reference: "",
    reference_alt: "",
    source: "",
    company: "",
    customer: "",
    status: "",
    entry_number: "",
    close_date: "",
    checkout_date: "",
    departure_data: "",
    arrival_date: "",
    fda: "",
    cbp: "",
    usda: "",
    lfd: "",
    lfd_fee: "",
    estimated_date: "",
    delivery_date: "",
    obs: "",

}
