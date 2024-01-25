import { GetReviewerActionTypes } from "../actionTypes/actionTypes";
import { SettingFormType } from "../types/types";

export const updateSettingField = (payload: Partial<SettingFormType>) => {
    return { type: GetReviewerActionTypes.UPDATE_SETTING_FIELD, payload };
};
