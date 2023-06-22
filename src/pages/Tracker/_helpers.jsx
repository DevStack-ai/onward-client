import * as Yup from 'yup';

export const EditSchema = Yup.object().shape({
    reference: Yup.string().required('Campo Obligatorio'),
});
export const CreateSchema = Yup.object().shape({
    reference: Yup.string().required('Campo Obligatorio'),

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


export const Columns = [{
    title: "No.",
    accesor: "",
    cell: (row) => <td>{row.index + 1}</td>
},
{
    title: "REF",
    accesor: "reference",
},
{
    title: "REF2",
    accesor: "reference_alt",
},
{
    title: "SOURCE",
    accesor: "source",
},
{
    title: "COMPANY",
    accesor: "company",
},
{
    title: "Cliente",
    accesor: "customer",
    className: "large"
},
{
    title: "Status BPO",
    accesor: "status",
    className: "large"
},
{
    title: "Status Externo",
    accesor: "Status",
    cell: (container) => <td className="large">{container.LiveMapUrl ? <a href={container.LiveMapUrl} target='_blank'>{container.Status}</a> : container.Status}</td>, 
    className: "large"
},
{
    title: "Fecha de cierre",
    accesor: "close_date",
},
{
    title: "Salida de bodega",
    accesor: "checkout_date",
},
{
    title: "Zarpe",
    accesor: "departure_data",
},
{
    title: "Arribo",
    accesor: "arrival_date",
},
{
    title: "Entry Number",
    accesor: "entry_number",
    className: "large"
},
{
    title: "FDA",
    accesor: "fda",
},
{
    title: "CBP",
    accesor: "cbp",
},
{
    title: "USDA",
    accesor: "usda",
},
{
    title: "LFD",
    accesor: "lfd",
},
{
    title: "LFD Fee",
    accesor: "lfd_fee",
},
{
    title: "Estimada de Entrega",
    accesor: "estimated_date",
    className: "large"
},
{
    title: "Fecha de Entrega",
    accesor: "delivery_date",
    className: "large"
},
{
    title: "OBS",
    accesor: "obs",
},
{ title: "ContainerNumber", },
{ title: "Message", },
{ title: "StatusId", },
{ title: "ReferenceNo", },
{ title: "ShippingLine", },
{ title: "FromCountry", },
{ title: "Pol", },
{ title: "Pod", },
{ title: "Vessel", },
{ title: "VesselIMO", },
{ title: "GateOutDate", },
{ title: "FormatedTransitTime", },
{ title: "Ultima actualizacion", accesor: "last_api_request"},

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