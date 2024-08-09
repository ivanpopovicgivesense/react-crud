import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CreateUserForm } from "../CreateUserForm";
import { UpdateUserForm } from "../UpdateUserForm";
import LayoutComponent from "./components/LayoutComponent";
import MyComponent from "../App";

export const App = () => (
  <Routes>
    <Route element={<LayoutComponent />}>
      <Route index path="/" element={<MyComponent />} />
      <Route path="/create" element={<CreateUserForm />} />
      <Route path="/update/:userId" element={<UpdateUserForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);