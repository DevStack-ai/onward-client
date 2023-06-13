import React from 'react'
import logo from "@assets/images/logo.png"
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {



    return (
        <header>
            <div className='d-flex justify-content-center'>
                <img src={logo} width="150px" className='pt-4 pb-2'/>
            </div>
            <div className='d-flex justify-content-center'>
                <h1>Trackerfy</h1>
            </div>
        </header>
    )
}

export default Header

