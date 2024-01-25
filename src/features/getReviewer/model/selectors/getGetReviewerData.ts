import { StateSchema } from "app/providers/StoreProvider";

export const getGetReviewerLogin = (state: StateSchema) => {
    return state.getReviewer.login || "";
};
export const getGetReviewerRepo = (state: StateSchema) =>
    state.getReviewer.repo || "";
export const getGetReviewerBlacklist = (state: StateSchema) =>
    state.getReviewer.blacklist || "";
