import React from 'react'
// import axios from "axios";
import AppRoutes from "./router/routes"
import { createRoot } from "react-dom/client";
// import { AuthProvider, setupAxios } from "./providers/auth.jsx"

// import "./assets/css/drawer.css"
// import "./assets/css/metronic.css"
// import './assets/css/pagination.css';
// import 'pure-react-carousel/dist/react-carousel.es.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./assets/css/fab.css"
import './assets/css/globalStyles.css'
import './assets/css/dropzone.css'


// setupAxios(axios);


const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      {/* <AuthProvider> */}
        <AppRoutes />
      {/* </AuthProvider> */}
    </React.StrictMode>,
  )
}
