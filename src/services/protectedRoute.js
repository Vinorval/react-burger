import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const location = useLocation();
    let auth = localStorage.getItem('authorization');

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
}
