import { useDispatch } from "react-redux";
import { type AppDispatch } from "./store";

// Создаем кастомный диспатч хук, чтобы пользоваться redux-thunk
export const useAppDispatch: () => AppDispatch = useDispatch;
