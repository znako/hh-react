import { GetReviewerReducer } from "features/getReviewer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

export default function configureStore() {
    const rootReducer = combineReducers({
        getReviewer: GetReviewerReducer,
    });

    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        {},
        composeWithDevTools(middlewareEnhancer)
    );

    return store;
}
