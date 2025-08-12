import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthContext, { AuthProvider } from "./Auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import RouteTracker from "./Auth/RouteTracker";
import ForbiddenPage from "./Components/Pages/ErrorPages/ForbiddenPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // ✅ outside the component

const RootApp = () => {
  const { portalStatus } = React.useContext(AuthContext);

  if (portalStatus === "loading") {
    return;
  }

  if (portalStatus === "forbidden") {
    return <ForbiddenPage />;
  }

  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouteTracker>
            <RootApp />
          </RouteTracker>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
