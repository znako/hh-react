import React, { useEffect, useState } from "react";
import { isStorageSupported } from "shared/lib/localStorage/isLocalStorageSupported";
import { LocalStorageContext } from "./LocalStorageContext";

interface LocalStorageProviderProps {
    children: React.ReactNode;
}

// Создаем провайдер, чтобы в каждом элементе, который хочет использовать localStorage, был доступ к переменной isLocalStorage, которая либо true либо false.
export const LocalStorageProvider = ({
    children,
}: LocalStorageProviderProps) => {
    const [isLocalStorage, setIsLocalStorage] = useState(false);
    useEffect(() => {
        setIsLocalStorage(isStorageSupported());
    }, []);

    return (
        <LocalStorageContext.Provider value={isLocalStorage}>
            {children}
        </LocalStorageContext.Provider>
    );
};
