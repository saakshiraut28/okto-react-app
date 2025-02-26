import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Hash, Hex, OktoProvider } from "@okto_web3/react-sdk";
 
const config = {
    environment: import.meta.env.VITE_OKTO_ENVIRONMENT,
    clientPrivateKey: import.meta.env.VITE_CLIENT_PRIV_KEY as Hash,
    clientSWA: import.meta.env.VITE_CLIENT_SWA as Hex,
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log(GOOGLE_CLIENT_ID);
console.log(config);
 
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <OktoProvider config={config}>
                <App />
            </OktoProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);