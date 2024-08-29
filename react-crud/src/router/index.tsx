import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CreateUserForm } from "../pages/CreateUserForm";
import { UpdateUserForm } from "../pages/UpdateUserForm";
import LayoutComponent from "./components/LayoutComponent";
import MyComponent from "../App";
import CalendarComponent from "../pages/Calendar";

export const App = () => (
  <Routes>
    <Route element={<LayoutComponent />}>
      <Route index path="/" element={<MyComponent />} />
      <Route path="/create" element={<CreateUserForm />} />
      <Route path="/update/:userId" element={<UpdateUserForm />} />
      <Route path="/calendar" element={<CalendarComponent />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);
