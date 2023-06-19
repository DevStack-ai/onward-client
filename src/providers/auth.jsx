import React, { useState, createContext, useContext, useEffect, useRef } from 'react'
import { LayoutSplashScreen } from "../components/layout"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase"
import { getUser } from './_requests';
import * as authHelpers from "./helpers"
import { useNavigate } from 'react-router-dom';

const initAuthContextPropsState = {
    session: authHelpers.getAuth(),
    currentUser: null,
    setCurrentUser: () => { },
    logout: async () => { },
    login: async (email, password) => { },

};

const AuthContext = createContext(initAuthContextPropsState);

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    async function logout() {
        signOut(auth);
        authHelpers.removeAuth()
    }
    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(() => {
        try {

            const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
                if (currentuser) {
                    const uid = currentuser.uid
                    const { data: document } = await getUser(uid)
                    authHelpers.setAuth(document)
                    setCurrentUser(document);
                } else {
                    setCurrentUser(null);
                    
                }

            });
            return () => {
                unsubscribe();
            };
        } catch (err) {
            console.log(err)
            setCurrentUser(null);
        }
    }, []);
    return (
        <AuthContext.Provider
            value={{ session: authHelpers.getAuth(), currentUser, setCurrentUser, logout, login }}
        >
            {children}
        </AuthContext.Provider>
    );
};
const AuthInit = ({ children }) => {


    const { session, logout, setCurrentUser } = useAuth();
    const didRequest = useRef(false);
    const [showSplashScreen, setShowSplashScreen] = useState(true);

    useEffect(() => {
        const requestUser = async () => {
            try {
                if (!didRequest.current) {
                    const { data: document } = await getUser(session.uid)
                    authHelpers.setAuth(document)
                    setCurrentUser(document);
                }
            } catch (error) {
                if (!didRequest.current) {
                    logout();
                }
            } finally {
                setShowSplashScreen(false);
            }

            return () => (didRequest.current = true);
        };
        if (session) {
            requestUser();
        } else {
            logout();
            setShowSplashScreen(false);
        }
    }, []);

    return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};
export { AuthInit, AuthProvider, useAuth };
