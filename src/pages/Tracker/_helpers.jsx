import * as Yup from 'yup';
import React from 'react'
import moment from "moment"


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

const isOK = (str) => str ? ["OK", "LIBERADO"].includes(str) ? "td-ok" : "td-nook" : "td-nok"

export const defaultFilters = {
    status: {
        operation: "not-in",
        value: ["PAGADO", "ANULADO"]
    }
}
export const defaultHistoryFilters = {
    status: {
        operation: "in",
        value: ["PAGADO", "ANULADO"]
    }
}

function numberWithCommas(x) {
    x = Number(x).toFixed(2)
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


export const Columns = [{
    title: "No.",
    accesor: "",
    className: "smaller",

    cell: (row) => <td className='text-center'>{row.index + 1}</td>
},
{
    title: "REF",
    accesor: "reference",
    className: "ref",
    headerStyle: { position: "sticky", left: 0, backgroundColor: "#EAEAEA" },
},
{
    title: "REF2",
    accesor: "reference_alt",
},
{
    title: "DOC NO",
    accesor: "docto_no",
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
    title: "CUSTOMER",
    accesor: "customer",
    className: "large"
},
{
    title: "SOURCE/COUNTRY",
    accesor: "country",
},
{
    title: "Status BPO",
    accesor: "status_bpo",
    cell: (container) => <td className="large">{container.bpo_livemapurl ? <a href={container.bpo_livemapurl} target='_blank'>{container.status_bpo}</a> : container.status_bpo}</td>,
    className: "large"
},
{
    title: "EXTERNAL STATUS",
    accesor: "status",
    cell: (container) => <td className="large">{container.LiveMapUrl ? <a href={container.LiveMapUrl} target='_blank'>{container.status}</a> : container.status}</td>,
    className: "large"
},
{
    title: "SALES DATE",
    cell: (container) => <td className="large">{container.value ? moment(container.value).format("MMMDDYYYY").toUpperCase() : "-"}</td>,
    accesor: "close_date",
},
{
    title: "WH DEPARTURE DATE",
    accesor: "checkout_date",
    cell: (container) => <td className="large">{container.value ? moment(container.value).format("MMMDDYYYY").toUpperCase() : "-"}</td>,

},
{
    title: "DEPARTURE DATE",
    accesor: "departure_data",
    cell: (container) => <td className="large">{container.value ? moment(container.value).format("MMMDDYYYY").toUpperCase() : "-"}</td>,

},
{
    title: "ARRIVAL DATE",
    accesor: "arrival_date",
    cell: (container) => <td className="large">{container.value ? moment(container.value).format("MMMDDYYYY").toUpperCase() : "-"}</td>,

},
{
    title: "Entry Number",
    accesor: "entry_number",
    className: "large"
},
{
    title: "INVOICE AMOUNT",
    accesor: "total_amount",
    className: "large",
    cell: (container) => <>{container.value ? `$${numberWithCommas(container.value)}` : ""}</>,

},
{
    title: "FDA",
    cell: (container) => <td className={`large ${isOK(container.value)}`}>{container.value}</td>,
    accesor: "fda",
},
{
    title: "CBP",
    cell: (container) => <td className={`large ${isOK(container.value)}`}>{container.value}</td>,
    accesor: "cbp",
},
{
    title: "USDA",
    cell: (container) => <td className={`large ${isOK(container.value)}`}>{container.value}</td>,
    accesor: "usda",
},
{
    title: "LFD",
    accesor: "lfd",
    cell: (container) => <td className="large">{container.value ? moment(container.value).format("MMMDDYYYY").toUpperCase() : "-"}</td>,

},
{
    title: "LFD Fee",
    accesor: "lfd_fee",
},
{
    title: "EST DELIVERY DATE",
    accesor: "estimated_date",
    cell: (container) => <td className="large">{container.value ? moment(container.value).format("MMMDDYYYY").toUpperCase() : "-"}</td>,

    className: "large"
},
{
    title: "DELIVERY DATE",
    accesor: "delivery_date",
    cell: (container) => <td className="large">{container.value ? moment(container.value).format("MMMDDYYYY").toUpperCase() : "-"}</td>,

    className: "large"
},
{
    title: "OBS",
    accesor: "obs",
    className: "large"

},
{ title: "CONTAINER #", accesor:"ContainerNumber" },
{ title: "Message", },
{ title: "StatusId", },
{ title: "ReferenceNo", className: "large" },
{ title: "ShippingLine", },
{ title: "FromCountry", },
{ title: "Pol", },
{ title: "Pod", },
{ title: "Vessel", },
{
    title: "VesselIMO",

},
{
    title: "GateOutDate",
    cell: (container) => <td className="large">{container.value ? moment(container.value).format("MMMDDYYYY").toUpperCase() : "-"}</td>,
},
{ title: "FormatedTransitTime", },
{
    title: "Ultima actualizacion", accesor: "last_api_request",

    cell: (container) => <td className="large">{container.value ? moment(container.value).subtract(6, "hours").format("MMMDDYYYY HH:mm:ss").toUpperCase() : "-"}</td>,

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

export const statusOptions = [
    "CERRADO - APROBADO POR EL CLIENTE",
    "STAND BY",
    "PROXIMO PROCESO",
    // "ANULADO",
    "EN PROCESO",
    "PROCESO TERMINADO",
    "TRANSITO TERR. A PTO.",
    "TRANSITO MARITIMO",
    "PUERTO DE DESTINO",
    "EN EXAMEN / HOLD",
    "LIBERADO",
    "EN PROCESO DE ENTREGA",
    "ENTREGADO",
    // "PAGADO"
]
export const statusEditOptions = [
    "CERRADO - APROBADO POR EL CLIENTE",
    "STAND BY",
    "PROXIMO PROCESO",
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