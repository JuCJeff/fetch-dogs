import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalProvider.js";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router basename="/fetch-dogs/">
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Router>
  </StrictMode>
);
