import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: FC = ({ children }) => {
    const location = useLocation();
    const auth = localStorage.getItem('authorization');

    if (!auth) {
        return <Navigate
            replace
            to={'/login'}
            state= {{
                from: location,
            }}
        />;
    }

    return (children as React.ReactElement);
    ;
}