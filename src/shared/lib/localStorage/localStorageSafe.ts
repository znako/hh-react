// Безопасное извлечение из localStorage
export const getLocalStorageItemSafe = (localStorageKey: string) => {
    const stringifyData = localStorage.getItem(localStorageKey);
    if (!stringifyData) return null;
    try {
        const data = JSON.parse(stringifyData);
        return data;
    } catch (error) {
        return null;
    }
};

// Безопасная вставка в localStorage
export const setLocalStorageItemSafe = (
    localStorageKey: string,
    data: unknown
) => {
    try {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
    } catch (error) {
        // localStorage переполнен, очищаем его
        localStorage.clear();
        localStorage.setItem(localStorageKey, JSON.stringify(data));
    }
};
