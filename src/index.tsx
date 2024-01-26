import { LocalStorageProvider } from "app/providers";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/styles/index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <LocalStorageProvider>
            <App />
        </LocalStorageProvider>
    </React.StrictMode>
);
