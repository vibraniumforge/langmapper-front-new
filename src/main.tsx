import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.tsx";
// import Index from "./routes/index";
// import Root from "./routes/root";
import "./index.css";
import "./styles/buttons.css";
import "./styles/edit-translation-form.css";
import "./styles/autofill.css";
import ErrorPage from "./error-page.tsx";
import Home from "./components/Home";
import NavbarWrapper from "./components/NavbarWrapper";
import SearchTranslations from "./components/SearchTranslations";
import ViewAllWords from "./containers/ViewAllWords.tsx";
import ViewAllLanguages from "./containers/ViewAllLanguages";
import ViewAllTranslations from "./components/ViewAllTranslations";
import CreateTranslationsMap from "./containers/CreateTranslationMap.tsx";
import CreateGenderMap from "./containers/CreateGenderMap.tsx";
import CreateEtymologyMap from "./containers/CreateEtymologyMap.tsx";
import EditTranslationForm from "./forms/EditTranslationForm.tsx";
import LoginForm from "./forms/LoginForm.tsx";
import SearchTranslationsByLanguage from "./containers/SearchTranslationsByLanguage";

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
      {
        path: "/edit_translation_form",
        element: <EditTranslationForm translation={null} />,
      },
      {
        path: "/login_form",
        element: <LoginForm />,
      },
      {
        path: "/all_translations_by_language",
        element: <SearchTranslationsByLanguage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
