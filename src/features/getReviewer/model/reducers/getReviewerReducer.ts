import { Reducer } from "react";
import { UnknownAction } from "redux";
import { GetReviewerActionTypes } from "../actionTypes/actionTypes";
import {
    Action,
    GetReviewerSchema,
    OwnerReviewerRestType,
    SettingFormType,
} from "../types/types";

const initialState: GetReviewerSchema = {
    isLoading: false,
    error: "",
    login: "",
    repo: "",
    blacklist: "",
    owner: null,
    reviewer: null,
    rest: [],
};

type UpdateSettingFieldActionType = Action<
    GetReviewerActionTypes.UPDATE_SETTING_FIELD,
    Partial<SettingFormType>
>;

type SetIsLoadingActionType = Action<
    GetReviewerActionTypes.SET_IS_LOADING,
    boolean
>;

type SetErrorActionType = Action<GetReviewerActionTypes.SET_ERROR, string>;

type SetDataFromApiActionType = Action<
    GetReviewerActionTypes.SET_DATA_FROM_API,
    OwnerReviewerRestType
>;

type Actions =
    | UpdateSettingFieldActionType
    | SetIsLoadingActionType
    | SetErrorActionType
    | SetDataFromApiActionType;

export function GetReviewerReducer(
    state: GetReviewerSchema = initialState,
    action: Actions
): GetReviewerSchema {
    switch (action.type) {
        case GetReviewerActionTypes.UPDATE_SETTING_FIELD:
            return { ...state, ...action.payload };
        case GetReviewerActionTypes.SET_IS_LOADING:
            return { ...state, isLoading: action.payload || false };
        case GetReviewerActionTypes.SET_ERROR:
            return { ...state, error: action.payload || "" };
        case GetReviewerActionTypes.SET_DATA_FROM_API:
            return {
                ...state,
                owner: action.payload?.owner || null,
                reviewer: action.payload?.reviewer || null,
                rest: action.payload?.rest || [],
            };
        default:
            return state;
    }
}
