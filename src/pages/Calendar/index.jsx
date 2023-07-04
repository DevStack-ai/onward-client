import React, { useCallback, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import esLocale from '@fullcalendar/core/locales/es'
import { getAllContainers, getAllHistory } from '../Tracker/_requests'
import Loading from '../../components/loading'
import { useNavigate } from 'react-router-dom'
function Calendar() {

    const colors = {
        close_date: "#56b72d",
        checkout_date: "#FF3131",
        departure_data: "#FFE922",
        arrival_date: "#A12DFF",
        estimated_date: "#FF9720",
        delivery_date: "#07DDDD",
        lfd: "#1525FF",

    }
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [containers, setContainers] = useState([])
    const [date, setDate] = useState("")
    const fetchAllData = useCallback(async () => {
        setIsLoading(true)
        const query_containers = await getAllContainers()
        const query_history = await getAllHistory()

        const response_containers = query_containers.data
        const response_history = query_history.data

        const containers = [...response_containers.documents, ...response_history.documents]
        let events = []
        for (const container of containers) {
            const ref = container.reference || container.reference_alt || container.container

            const base = {
                groupId: container.uid,
                title: `${ref} | ${container.status}`,
                className: "cursor-pointer"
            }

            if (container.close_date) {
                events.push({
                    ...base,
                    date: container.close_date,
                    backgroundColor: colors.close_date,
                })
            }
            if (container.checkout_date) {
                events.push({
                    ...base,
                    date: container.checkout_date,
                    backgroundColor: colors.checkout_date,
                })
            }
            if (container.departure_data) {
                events.push({
                    ...base,
                    textColor: "#000",
                    date: container.departure_data,
                    backgroundColor: colors.departure_data,
                })
            }
            if (container.arrival_date) {
                events.push({
                    ...base,
                    date: container.arrival_date,
                    backgroundColor: colors.arrival_date
                })
            }
            if (container.estimated_date) {
                events.push({
                    ...base,
                    date: container.estimated_date,
                    backgroundColor: colors.estimated_date
                })
            }
            if (container.delivery_date) {
                events.push({
                    ...base,
                    date: container.delivery_date,
                    backgroundColor: colors.delivery_date
                })
            }
            if (container.lfd) {
                events.push({
                    ...base,
                    date: container.lfd,
                    backgroundColor: colors.lfd
                })
            }
        }
        setContainers(containers)
        setEvents(events)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchAllData()
    }, [])

    useEffect(() => {
        if (!date) {
            let events = []
            for (const container of containers) {
                const ref = container.reference || container.reference_alt || container.container

                const base = {
                    groupId: container.uid,
                    title: `${ref} | ${container.status}`,
                    className: "cursor-pointer"
                }

                if (container.close_date) {
                    events.push({
                        ...base,
                        date: container.close_date,
                        backgroundColor: colors.close_date,
                    })
                }
                if (container.checkout_date) {
                    events.push({
                        ...base,
                        date: container.checkout_date,
                        backgroundColor: colors.checkout_date,
                    })
                }
                if (container.departure_data) {
                    events.push({
                        ...base,
                        date: container.departure_data,
                        textColor: "#000",
                        backgroundColor: colors.departure_data,
                    })
                }
                if (container.arrival_date) {
                    events.push({
                        ...base,
                        date: container.arrival_date,
                        backgroundColor: colors.arrival_date
                    })
                }
                if (container.estimated_date) {
                    events.push({
                        ...base,
                        date: container.estimated_date,
                        backgroundColor: colors.estimated_date
                    })
                }
                if (container.delivery_date) {
                    events.push({
                        ...base,
                        date: container.delivery_date,
                        backgroundColor: colors.delivery_date
                    })
                }
                if (container.lfd) {
                    events.push({
                        ...base,
                        date: container.lfd,
                        backgroundColor: colors.lfd
                    })
                }
            }
            setEvents(events)

        }

        if (date) {
            let events = []
            for (const container of containers) {
                const ref = container.reference || container.reference_alt || container.container

                const base = {
                    groupId: container.uid,
                    title: `${ref} | ${container.status}`,
                    className: "cursor-pointer"
                }

                if (container[date]) {
                    events.push({
                        ...base,
                        textColor: date === "departure_data" ? "#000" : "#FFF",
                        date: container[date],
                        backgroundColor: colors[date]
                    })
                }

            }
            setEvents(events)
        }
    }, [date])
    function handleClick(info) {
        const uid = info.event._def.groupId
        navigate(`/containers/details/${uid}`)
    }

    return (<>
        <div className='container-onward'>
            <div className='card-container'>
                <div className='col'>
                    <label className={`col-sm-12 col-lg-2 col-form-label fw-bold fs-6`}>
                        Tipo de fecha
                    </label>
                    <div className="col-3">
                        <select
                            id='date-type'
                            value={date}
                            onChange={(ev) => {
                                console.log(ev.target.value)
                                setDate(ev.target.value)
                            }}
                            className='form-select form-select-solid'
                            placeholder='selecciona tipo de fecha'>
                            <option value="">Seleccione un tipo de fecha</option>
                            <option value="close_date">Fecha de cierre</option>
                            <option value="checkout_date">Fecha de bodega</option>
                            <option value="departure_data">Zarpe</option>
                            <option value="arrival_date">Arribo</option>
                            <option value="lfd">LFD</option>
                            <option value="estimated_date">Estimada de Entrega</option>
                            <option value="delivery_date">Fecha de Entrega</option>
                        </select>
                    </div>
                </div>
                {isLoading && <Loading />}
                {!isLoading && <>
                    <FullCalendar
                        headerToolbar={{
                            start: "",
                            center: "title",
                            end: "today prev,next"
                        }}
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        locale={esLocale}
                        events={events}
                        eventClick={handleClick}

                    />
                </>}
            </div>
        </div>
    </>)

}

export default Calendar