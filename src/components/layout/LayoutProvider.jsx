import { createContext, useEffect } from "react"
import Header from "./core/header"
import Footer from "./core/footer"
import AsideMenu from "./core/asidemenu"

import { useAuth } from "../../providers"

const LayoutContext = createContext({
    useModal: (event, content) => { },
    setLayout: (config) => { },
})

const enableSplashScreen = () => {
    const splashScreen = document.getElementById('splash-screen')
    if (splashScreen) {
        splashScreen.style.setProperty('display', 'flex')
    }
}

const disableSplashScreen = () => {
    const splashScreen = document.getElementById('splash-screen')
    if (splashScreen) {
        splashScreen.style.setProperty('display', 'none')
    }
}

const LayoutProvider = ({ children }) => {



    const setLayout = (_themeConfig) => {
        enableSplashScreen()
        const bodyClasses = Array.from(document.body.classList)
        bodyClasses.forEach((cl) => document.body.classList.remove(cl))

        setTimeout(() => {
            disableSplashScreen()
        }, 500)
    }

    const value = {

        setLayout,
    }

    useEffect(() => {
        disableSplashScreen()
    }, [])
    const { currentUser } = useAuth()
    console.log(currentUser)
    if (currentUser) {
        return <>
            <LayoutContext.Provider value={value}>
                <div className="app-container">
                    <Header />
                    <AsideMenu />
                    <div className="layout-container">
                        {children}
                    </div>
                    <Footer />
                </div>
            </LayoutContext.Provider>
        </>
    }
    return (
        <LayoutContext.Provider value={value}>
            <div className="app-container">
                {children}

            </div>
        </LayoutContext.Provider>
    )
}


export { LayoutProvider }