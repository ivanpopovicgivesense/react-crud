import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

const LayoutComponent: React.FunctionComponent = () => {
  return (
    <>
      <Outlet />
      <ScrollRestoration getKey={(location) => location.pathname} />
    </>
  );
};

export default LayoutComponent;
