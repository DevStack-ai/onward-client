import React, { createContext, useContext, useEffect, useState } from 'react'

const SplashScreenContext = createContext(undefined)

const SplashScreenProvider = ({ children }) => {
  const [count, setCount] = useState(0)
  let visible = count > 0

  useEffect(() => {
    // Show SplashScreen
    if (visible) {
      document.body.classList.remove('page-loading')

      return () => {
        document.body.classList.add('page-loading')
      }
    }

    // Hide SplashScreen
    let timeout
    if (!visible) {
      timeout = window.setTimeout(() => {
        document.body.classList.add('page-loading')
      }, 3000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [visible])

  return (
    <SplashScreenContext.Provider value={setCount}>
      {children}
    </SplashScreenContext.Provider>
  )
}

const LayoutSplashScreen = ({ visible = true }) => {
  // Everything are ready - remove splashscreen
  const setCount = useContext(SplashScreenContext)

  useEffect(() => {
    if (!visible) {
      return
    }

    if (setCount) {
      setCount((prev) => {
        return prev + 1
      })
    }

    return () => {
      if (setCount) {
        setCount((prev) => {
          return prev - 1
        })
      }
    }
  }, [setCount, visible])

  return null
}

export { SplashScreenProvider, LayoutSplashScreen }
