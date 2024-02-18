import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.tsx";
// import Index from "./routes/index";
// import Root from "./routes/root";
import "./index.css";
import ErrorPage from "./error-page.tsx";
import Home from "./components/Home";
import NavbarWrapper from "./components/NavbarWrapper";
import SearchTranslations from "./components/SearchTranslations";
import ViewAllWords from "./components/ViewAllWords";
import ViewAllLanguages from "./components/ViewAllLanguages";
import ViewAllTranslations from "./components/ViewAllTranslations";
import CreateTranslationsMap from "./containers/CreateTranslationMap.tsx";
import CreateGenderMap from "./containers/CreateGenderMap.tsx";
import CreateEtymologyMap from "./containers/CreateEtymologyMap.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      { path: "/search_translations", element: <SearchTranslations /> },
      { path: "/all_languages", element: <ViewAllLanguages /> },
      { path: "/all_words", element: <ViewAllWords /> },
      { path: "/all_translations", element: <ViewAllTranslations /> },
      {
        path: "/create_translation_map",
        element: <CreateTranslationsMap />,
      },
      {
        path: "/create_gender_map",
        element: <CreateGenderMap />,
      },
      {
        path: "/create_etymology_map",
        element: <CreateEtymologyMap />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
