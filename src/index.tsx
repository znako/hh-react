import { LocalStorageProvider } from "app/providers/LocalStorageProvider";
import { StoreProvider } from "app/providers/StoreProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/styles/index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <StoreProvider>
            <LocalStorageProvider>
                <App />
            </LocalStorageProvider>
        </StoreProvider>
    </React.StrictMode>
);
