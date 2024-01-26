import { useContext } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { SettingForm } from "../settingForm/SettingForm";
import { UsersInfo } from "../usersInfo/UsersInfo";
import cls from "./GetReviewer.module.css";
import { LocalStorageContext } from "app/providers/LocalStorageProvider";
import { useSelector } from "react-redux";
import { getRandomReviewerData } from "../../model/actionCreators/getRandomReviewerData";
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

    const isLocalStorage = useContext(LocalStorageContext);

    // callback который будет срабатывать на отправку формы настроек. Диспатчит асинхронный экшн, который в свою очередь дергает ручку, сохраняет данные в стор и в LS
    const onSubmitForm = async (
        login: string,
        repo: string,
        blacklist: string
    ) => {
        dispatch(getRandomReviewerData(login, repo, blacklist, isLocalStorage));
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
