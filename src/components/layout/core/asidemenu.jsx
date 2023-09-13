import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@assets/css/sidebar.css';
import logo from "@assets/images/logo.png"
import { sidebarNavItems } from './sidebarNavItems';
import { useAuth } from '../../../providers';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();
    const { currentUser, logout } = useAuth()
    const permissionNavs = sidebarNavItems.filter(item => !item.admin || currentUser.role === "admin")



    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = permissionNavs.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    if (!currentUser) {
        return null;
    }
    return <div className='sidebar'>
        <div className="sidebar__logo pt-5">
            <img src={logo} width="80%" />
        </div>
        <div className="sidebar__menu mt-4">
            {
                permissionNavs.map((item, index) => (
                    <Link to={item.to} key={index} className='no-deco'>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
        <div className={`sidebar__menu__item cursor-pointer`} onClick={logout}>
            <div className="sidebar__menu__item__icon">
                <i className='bx bx-log-out' ></i>
            </div>
            <div className="sidebar__menu__item__text">
                Salir
            </div>
        </div>
    </div>;
};

export default Sidebar;