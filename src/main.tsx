import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { OktoProvider } from "@okto_web3/react-sdk";
import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

// Define the config type and context type
const defaultConfig = {
  environment: "sandbox",
  vendorPrivKey: "",
  vendorSWA: "",
};

const config = {
  environment: import.meta.env.VITE_OKTO_ENVIRONMENT || defaultConfig.environment,
  clientPrivateKey:
    import.meta.env.VITE_OKTO_CLIENT_PRIVATE_KEY || defaultConfig.vendorPrivKey,
  clientSWA: import.meta.env.VITE_OKTO_CLIENT_SWA,
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log(GOOGLE_CLIENT_ID);
console.log(config);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <OktoProvider config={config}>
          <App />
        </OktoProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
