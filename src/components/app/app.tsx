import React from "react";
import appStyles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from "../../pages/home";
import NotFound from "../../pages/notFound";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgotPassword";
import ResetPasswordPage from "../../pages/resetPassword";
import ProfilePage from "../../pages/profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> }/>
        <Route path="/profile" element={ <ProfilePage />} />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/forgot-password" element={ <ForgotPasswordPage />} />
        <Route path="/reset-password" element={ <ResetPasswordPage /> }/>
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
}
