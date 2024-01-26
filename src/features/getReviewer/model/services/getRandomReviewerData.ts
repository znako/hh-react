import { Dispatch } from "redux";
import { SETTINGS_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { setLocalStorageItemSafe } from "shared/lib/localStorage/localStorageSafe";
import {
    setDataFromApi,
    setError,
    setIsLoading,
} from "../actionCreators/actionCreators";
import { getRandomReviewer } from "./getRandomReviewer";

export const getRandomReviewerData = (
    login: string,
    repo: string,
    blacklist: string,
    isLocalStorage: boolean
) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true));
        dispatch(setError(""));

        try {
            const { owner, reviewer, rest } = await getRandomReviewer(
                login,
                repo,
                blacklist
            );
            dispatch(
                setDataFromApi({
                    owner: owner || {
                        login,
                        contributions: 0,
                        type: "User",
                    },
                    reviewer,
                    rest,
                })
            );
            if (isLocalStorage) {
                setLocalStorageItemSafe(SETTINGS_LOCALSTORAGE_KEY, {
                    login,
                    repo,
                    blacklist,
                });
            }
        } catch (error) {
            dispatch(setError(error as string));
        } finally {
            dispatch(setIsLoading(false));
        }
    };
};
