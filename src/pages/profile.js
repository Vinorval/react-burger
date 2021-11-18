import React from "react";
import AppHeader from "../components/appHeader/appHeader";
import Profile from "../components/profile/profile";
import { Routes, Route } from 'react-router-dom';

export default function ProfilePage() {
    return (
        <>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Profile />} />
          </Routes>
          <Routes>
            <Route path="/orders" element={<Profile />} />
          </Routes>
        </>
    )
}