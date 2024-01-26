import { getRandomReviewer } from "../../model/services/getRandomReviewer";
import { GithubUserDataType } from "../../model/types/types";
import { useContext, useState } from "react";
import { SETTINGS_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { classNames } from "shared/lib/classNames/classNames";
import { setLocalStorageItemSafe } from "shared/lib/localStorage/localStorageSafe";
import { SettingForm } from "../settingForm/SettingForm";
import { UsersInfo } from "../usersInfo/UsersInfo";
import cls from "./GetReviewer.module.css";
import { LocalStorageContext } from "app/providers/LocalStorageProvider";
import { useDispatch, useSelector } from "react-redux";
import { getRandomReviewerData } from "../../model/services/getRandomReviewerData";
import { useAppDispatch } from "app/providers/StoreProvider";
import {
    getGetReviewerError,
    getGetReviewerIsLoading,
    getGetReviewerOwner,
    getGetReviewerRest,
    getGetReviewerReviewer,
} from "../../model/selectors/getGetReviewerData";

interface GetReviewerProps {
    className?: string;
}

export const GetReviewer = ({ className }: GetReviewerProps) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getGetReviewerIsLoading);
    const error = useSelector(getGetReviewerError);
    const owner = useSelector(getGetReviewerOwner);
    const reviewer = useSelector(getGetReviewerReviewer);
    const restContributors = useSelector(getGetReviewerRest);
    // const [error, setError] = useState<string>("");
    // const [loading, setLoading] = useState<boolean>(false);
    // const [owner, setOwner] = useState<null | GithubUserDataType>(null);
    // const [reviewer, setReviewer] = useState<null | GithubUserDataType>(null);
    // const [restContributors, setRestContributors] = useState<
    //     Array<GithubUserDataType>
    // >([]);

    const isLocalStorage = useContext(LocalStorageContext);

    // callback который будет срабатывать на отправку формы настроек. Получает рандомного ревьювера, сохраняет данные
    const onSubmitForm = async (
        login: string,
        repo: string,
        blacklist: string
    ) => {
        dispatch(getRandomReviewerData(login, repo, blacklist, isLocalStorage));
        // setLoading(true);
        // setError("");

        // try {
        //     // Получаем рандомного ревьювера
        //     const { owner, reviewer, rest } = await getRandomReviewer(
        //         login,
        //         repo,
        //         blacklist
        //     );
        //     // Сохраняем данные в стейт
        //     owner
        //         ? setOwner(owner)
        //         : setOwner({ login, contributions: 0, type: "User" });
        //     setReviewer(reviewer);
        //     setRestContributors(rest);

        //     // Сохраняем данные в LocalStorage
        //     if (isLocalStorage) {
        //         setLocalStorageItemSafe(SETTINGS_LOCALSTORAGE_KEY, {
        //             login,
        //             repo,
        //             blacklist,
        //         });
        //     }
        // } catch (error) {
        //     setError(error as string);
        // }
        // setLoading(false);
    };

    return (
        <div className={classNames(cls.GetReviewer, {}, [className])}>
            <h2 className={cls.title}>Поиск ревьювера</h2>
            <SettingForm
                onSubmitForm={onSubmitForm}
                isLoading={isLoading}
                error={error}
                className={cls.settingForm}
            />
            <UsersInfo
                className={cls.usersInfo}
                owner={owner}
                reviewer={reviewer}
                restContributors={restContributors}
                isLoading={isLoading}
            />
        </div>
    );
};
