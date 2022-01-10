import React from "react";
import Profile from "../components/profile/profile";
import { Routes, Route } from 'react-router-dom';
import OrderPage from "./order";

export default function ProfilePage(props:any) {
    return (
        <>
          <Routes>
            <Route path="/" element={<Profile />} />
          </Routes>
          <Routes>
            <Route path="/orders" element={<Profile openPopup={props.openPopup} />} />
          </Routes>
        </>
    )
}