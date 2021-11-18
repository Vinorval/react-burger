import React from "react";
import appStyles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, RootStateOrAny } from "react-redux";

import HomePage from "../../pages/home";
import NotFound from "../../pages/notFound";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgotPassword";
import ResetPasswordPage from "../../pages/resetPassword";
import ProfilePage from "../../pages/profile";
import { ProtectedRoute } from "../../services/protectedRoute";
export const IsLoggedInContext = React.createContext(false);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const notAuth = useSelector( (store: RootStateOrAny) =>  ({ notAuth: store.auth?.notAuth }));
  //console.log({notAuth})

  React.useEffect(() => {
    setIsLoggedIn(Boolean(notAuth))
    console.log(Boolean(!notAuth))
  }, [notAuth])

  return (
    <IsLoggedInContext.Provider value={isLoggedIn}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> }/>
        <Route path="/profile/*" element={ <ProtectedRoute><ProfilePage /></ProtectedRoute> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/forgot-password" element={ <ForgotPasswordPage />} />
        <Route path="/reset-password" element={ <ResetPasswordPage /> }/>
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
    </IsLoggedInContext.Provider>
  );
}
