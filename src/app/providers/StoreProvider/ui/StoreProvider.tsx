import React from "react";
import { Provider } from "react-redux";
import configureStore from "../config/store";

interface StoreProviderProps {
    children: React.ReactNode;
}

// Провайдер, чтобы обернуть App, для доступа к стору в компонентах
export const StoreProvider = ({ children }: StoreProviderProps) => {
    const store = configureStore();

    return <Provider store={store}>{children}</Provider>;
};
