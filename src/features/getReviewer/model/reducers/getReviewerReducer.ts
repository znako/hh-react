import { Reducer } from "react";
import { UnknownAction } from "redux";
import { GetReviewerActionTypes } from "../actionTypes/actionTypes";
import { Action, GetReviewerSchema, SettingFormType } from "../types/types";

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

type Actions = UpdateSettingFieldActionType;
export function GetReviewerReducer(
    state: GetReviewerSchema = initialState,
    action: Actions
) {
    switch (action.type) {
        case GetReviewerActionTypes.UPDATE_SETTING_FIELD:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
