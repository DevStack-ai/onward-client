import { createContext, useEffect } from "react"
import Header from "./core/header"
import Footer from "./core/footer"

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
        // LayoutSetup.updatePartialConfig(_themeConfig)
        // setConfig(Object.assign({}, LayoutSetup.config))
        // setClasses(LayoutSetup.classes)
        // setAttributes(LayoutSetup.attributes)
        // setCSSVariables(LayoutSetup.cssVariables)
        setTimeout(() => {
            disableSplashScreen()
        }, 500)
    }

    const value = {
        // config,
        // classes,
        // attributes,
        // cssVariables,
        setLayout,
    }

    useEffect(() => {
        disableSplashScreen()
    }, [])


    return (
        <LayoutContext.Provider value={value}>
            <div className="app-container">
                <Header />
                {children}
                <Footer />
            </div>
        </LayoutContext.Provider>
    )
}


export { LayoutProvider }