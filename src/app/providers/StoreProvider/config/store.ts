import { GetReviewerReducer } from "features/getReviewer";
import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    createStore,
} from "redux";
import { thunk, ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { StateSchema } from "./stateSchema";

export default function configureStore() {
    const rootReducer = combineReducers({
        getReviewer: GetReviewerReducer,
    });

    const middlewares: ThunkMiddleware<StateSchema, AnyAction> = thunk;
    const middlewareEnhancer = applyMiddleware(middlewares);

    const store = createStore(
        rootReducer,
        {},
        composeWithDevTools(middlewareEnhancer) // дев тулсы, чтобы было удобно отслеживать изменения
    );

    return store;
}

export type AppDispatch = ReturnType<typeof configureStore>["dispatch"];
