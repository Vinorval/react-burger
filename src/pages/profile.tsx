import React from "react";
import Profile from "../components/profile/profile";
import { Routes, Route } from 'react-router-dom';
import OrderPage from "./order";

export default function ProfilePage() {
    return (
        <>
          <Routes>
            <Route path="/" element={<Profile />} />
          </Routes>
          <Routes>
            <Route path="/orders" element={<Profile />} />
          </Routes>
        </>
    )
}