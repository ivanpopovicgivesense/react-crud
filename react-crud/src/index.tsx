import React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { App } from "./router";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  {
    basename: process.env.basename,
  }
);

const Element = () => {
  return (
    <FluentProvider style={{ height: "100%" }} theme={webLightTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  );
};
root.render(<Element />);
