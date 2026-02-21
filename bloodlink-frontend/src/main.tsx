import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="165842518661-2smkv2bkh6k3gm97pvveqjiioh4f5ts3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);