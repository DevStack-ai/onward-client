import React from 'react'
import axios from "axios";
import AppRoutes from "./router/routes"
import { createRoot } from "react-dom/client";
import { AuthProvider, setupAxios } from "./providers"

// import "./assets/css/drawer.css"
// import "./assets/css/metronic.css"
// import './assets/css/pagination.css';
// import 'pure-react-carousel/dist/react-carousel.es.css';
// import "./assets/css/fab.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';

import './assets/css/metronic.css'
import './assets/css/globalStyles.css'
import './assets/css/pagination.css'
import './assets/css/dropzone.css'
import './assets/css/form.css'

// setupAxios(axios);


const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </React.StrictMode>,
  )
}
