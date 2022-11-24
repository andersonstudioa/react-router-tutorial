import React from "react";
import ReactDOM from "react-dom/client";
import Home, { 
  loader as rootLoader,
  action as rootAction,
} from "./pages/home";
import ErrorPage from "./pages/error-page";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./pages/contact";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import EditContact, {
  action as editAction,
} from "./pages/edit";
import { action as destroyAction } from "./pages/destroy";
import Index from "./pages/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { 
            index: true,
            element: <Index />,
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <ErrorPage />,
          },
        ]
      }
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);