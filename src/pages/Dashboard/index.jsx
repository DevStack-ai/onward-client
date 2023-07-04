import React from 'react'
import { useAuth } from '../../providers'
import boat from "@assets/images/logo-bpo.png"

function Dashboard() {

    const { currentUser } = useAuth()

    return (
        <div className='container-onward'>
            <div className='card-container'>
                <div className='p-5 text-left'>
                    <h2 > Bienvenido, {currentUser.email}</h2>
                    <div className='p-5 '>
                        <div className='dashboard-contianer p-5 d-flex justify-content-between flex-column'>
                            <div></div>
                            <div></div>

                            <h1 className='dashboard-title text-center'> MODULO DE<br/> REPORTES</h1>

                            <div className='d-flex justify-content-end'>
                                <div className='mt-5'>
                                    <img src={boat} width="80%" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>)
}

export default Dashboard