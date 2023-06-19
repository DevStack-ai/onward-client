import React from 'react'
import { useAuth } from '../../../providers'
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
const Header = () => {

    const { currentUser } = useAuth()
    if (!currentUser) {
        return null;
    } 
    return (
        <header>

            <div className='mobile bg-white p-3'>
                <div className='d-flex justify-content-end'>
                    <div>
                        <i className='bx bx-menu bx-icon'></i>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

