import React, { useCallback, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import esLocale from '@fullcalendar/core/locales/es'
import { getAllContainers } from '../Tracker/_requests'
import Loading from '../../components/loading'
import { useNavigate } from 'react-router-dom'
function Calendar() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [containers, setContainers] = useState([])

    const fetchAllData = useCallback(async () => {
        setIsLoading(true)
        const query = await getAllContainers()
        const response = query.data


        const containers = response.documents

        let events = []
        for (const container of containers) {
            const ref = container.container || container.reference || container.reference_alt

            const base = {
                groupId: container.uid,
                className: "cursor-pointer"
            }

            if (container.close_date) {
                events.push({
                    ...base,
                    title: `${ref} | Fecha de cierre`,
                    date: container.close_date,
                    backgroundColor: "#444444",
                })
            }
            if (container.checkout_date) {
                events.push({
                    ...base,
                    title: `${ref} | Salida de bodega`,
                    date: container.checkout_date,
                    backgroundColor: "#3F88C5",
                })
            }
            if (container.departure_data) {
                events.push({
                    ...base,
                    title: `${ref} | Zarpe`,
                    date: container.departure_data,
                    backgroundColor: "#D67709",
                })
            }
            if (container.arrival_date) {
                events.push({
                    ...base,
                    title: `${ref} | Arribo`,
                    date: container.arrival_date,
                    backgroundColor: "#A81917"
                })
            }
            if (container.estimated_date) {
                events.push({
                    ...base,
                    title: `${ref} | Estimada de Entrega`,
                    date: container.estimated_date,
                    backgroundColor: "#63458A"
                })
            }
            if (container.delivery_date) {
                events.push({
                    ...base,
                    title: `${ref} | Entrega`,
                    date: container.delivery_date,
                    backgroundColor: "#1E441E"
                })
            }
        }
        setEvents(events)
        setContainers(containers)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchAllData()
    }, [])

    function handleClick(info) {
        const uid = info.event._def.groupId
        navigate(`/containers/details/${uid}`)
    }

    return (<>
        <div className='container'>
            <div className='card-container'>

                {isLoading && <Loading />}
                {!isLoading && <>
                    <FullCalendar
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