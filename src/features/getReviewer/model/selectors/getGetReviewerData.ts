import { StateSchema } from "app/providers/StoreProvider";

export const getGetReviewerLogin = (state: StateSchema) => {
    return state.getReviewer.login || "";
};
export const getGetReviewerRepo = (state: StateSchema) =>
    state.getReviewer.repo || "";
export const getGetReviewerBlacklist = (state: StateSchema) =>
    state.getReviewer.blacklist || "";
export const getGetReviewerIsLoading = (state: StateSchema) =>
    state.getReviewer.isLoading || false;
export const getGetReviewerError = (state: StateSchema) =>
    state.getReviewer.error || "";
export const getGetReviewerOwner = (state: StateSchema) =>
    state.getReviewer.owner || null;
export const getGetReviewerReviewer = (state: StateSchema) =>
    state.getReviewer.reviewer || null;
export const getGetReviewerRest = (state: StateSchema) =>
    state.getReviewer.rest || [];
