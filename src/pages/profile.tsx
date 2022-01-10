import React from "react";
import Profile from "../components/profile/profile";
import { Routes, Route } from 'react-router-dom';
import OrderPage from "./order";

type TProps = { openPopup: Function }

export default function ProfilePage(props: TProps) {
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