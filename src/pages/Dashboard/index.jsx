import React from 'react'
import { useAuth } from '../../providers'
import boat from "@assets/images/boat.svg"

function Dashboard() {

    const { currentUser } = useAuth()

    return (
        <div className='container-onward'>
            <div className='card-container'>
                <div className='p-5 text-center'>
                    <h2 > Bienvenido, {currentUser.email}</h2>
                    <div className='mt-5'>
                        <img src={boat} width="70%" />
                    </div>
                </div>
            </div>
        </div>)
}

export default Dashboard