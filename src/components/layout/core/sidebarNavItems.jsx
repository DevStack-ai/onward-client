export const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className='bx bx-home'></i>,
        to: '/',
        section: ''
    },
    {
        display: 'Usuarios',
        icon: <i className='bx bx-user'></i>,
        to: '/users',
        section: 'users',
        admin: true
    },
    {
        display: 'Contenedores',
        icon: <i className='bx bx-package'></i>,
        to: '/containers',
        section: 'containers'
    },
    {
        display: 'Calendario',
        icon: <i className='bx bx-calendar'></i>,
        to: '/calendar',
        section: 'calendar'
    },
];
