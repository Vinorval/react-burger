import React from "react";
//import { Navigate, useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { IsLoggedInContext } from "../components/app/app";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const isLoggedIn = useContext(IsLoggedInContext);
    const location = useLocation();
    let navigate = useNavigate();
    let auth = localStorage.getItem('authorization');

    //if(!auth) { return navigate('/login') }

    if (!auth) {
        return <Navigate
            replace
            to={'/login'}
            state= {{
                from: location,
            }}
        />;
    }

    return children;
    //const notAuth = useSelector( store =>  ({ notAuth: store.auth.notAuth }))
    //console.log(notAuth)
    //let log = false

    //React.useEffect(() => {
    //    let log = false
    //    if (!notAuth) {log = false; return log}
    //    if (notAuth) {log = true; return log}
    //}, [notAuth])
    //console.log(log)

    //if (log) { console.log(!notAuth); return children}
    //if (!log) return <Navigate replace to="/login" state={{ from: location }} />
}
