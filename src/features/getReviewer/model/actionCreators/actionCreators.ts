import { GetReviewerActionTypes } from "../actionTypes/actionTypes";
import { OwnerReviewerRestType, SettingFormType } from "../types/types";

export const updateSettingField = (payload: Partial<SettingFormType>) => {
    return { type: GetReviewerActionTypes.UPDATE_SETTING_FIELD, payload };
};

export const setIsLoading = (payload: boolean) => {
    return { type: GetReviewerActionTypes.SET_IS_LOADING, payload };
};

export const setError = (payload: string) => {
    return { type: GetReviewerActionTypes.SET_ERROR, payload };
};

export const setDataFromApi = (payload: OwnerReviewerRestType) => {
    return { type: GetReviewerActionTypes.SET_DATA_FROM_API, payload };
};
