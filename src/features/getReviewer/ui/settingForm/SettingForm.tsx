import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import cls from "./SettingForm.module.css";
import { ReactComponent as SettingIcon } from "shared/assets/settings.svg";
import { classNames } from "shared/lib/classNames/classNames";
import { getLocalStorageItemSafe } from "shared/lib/localStorage/localStorageSafe";
import { SETTINGS_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { SettingFormType } from "../../model/types/types";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingField } from "../../model/actionCreators/actionCreators";
import { LocalStorageContext } from "app/providers/LocalStorageProvider";
import {
    getGetReviewerBlacklist,
    getGetReviewerLogin,
    getGetReviewerRepo,
} from "../../model/selectors/getGetReviewerData";

interface SettingFormProps {
    className?: string;
    onSubmitForm: (login: string, repo: string, blacklist: string) => void;
    isLoading: boolean;
    error: string;
}

// Форма настроек
export const SettingForm = ({
    className,
    onSubmitForm,
    isLoading,
    error,
}: SettingFormProps) => {
    const dispatch = useDispatch();
    const login = useSelector(getGetReviewerLogin);
    const repo = useSelector(getGetReviewerRepo);
    const blacklist = useSelector(getGetReviewerBlacklist);

    const [settingShow, setSettingShow] = useState<boolean>(true);
    // const [login, setLogin] = useState<string>("");
    // const [repo, setRepo] = useState<string>("");
    // const [blacklist, setBlacklist] = useState<string>("");

    const isLocalStorage = useContext(LocalStorageContext);

    // При первом mounte получаем данные из localStorage и сохраняем в стейт
    useEffect(() => {
        if (isLocalStorage) {
            const settings = getLocalStorageItemSafe(
                SETTINGS_LOCALSTORAGE_KEY
            ) as SettingFormType | null;
            if (settings) {
                dispatch(updateSettingField({ login: settings.login }));
                dispatch(updateSettingField({ repo: settings.repo }));
                dispatch(updateSettingField({ blacklist: settings.blacklist }));
            }
        }
    }, [isLocalStorage, dispatch]);

    const onSubmitFormHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        onSubmitForm(login, repo, blacklist);
    };

    // Скрывам/показываем настройки
    const onSettingButtonClickHandler = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        event.preventDefault();
        setSettingShow(!settingShow);
    };

    const onChangeLogin = (login: string) => {
        dispatch(updateSettingField({ login }));
    };

    const onChangeRepo = (repo: string) => {
        dispatch(updateSettingField({ repo }));
    };

    const onChangeBlacklist = (blacklist: string) => {
        dispatch(updateSettingField({ blacklist }));
    };

    return (
        <form className={classNames(cls.SettingForm, {}, [className])}>
            {error && <div className={cls.error}>{error}</div>}
            {settingShow && (
                <>
                    <Input
                        label="Ваш логин"
                        value={login}
                        onChange={onChangeLogin}
                        name="login"
                        className={cls.input}
                        autoFocus
                    />
                    <Input
                        label="Репозиторий"
                        value={repo}
                        onChange={onChangeRepo}
                        name="repo"
                        className={cls.input}
                    />
                    <Input
                        label="Блэк-лист (логины через пробел)"
                        value={blacklist}
                        onChange={onChangeBlacklist}
                        name="blacklist"
                        className={cls.input}
                    />
                </>
            )}
            <div className={cls.ButtonsWrapper}>
                <Button onClick={onSubmitFormHandler} disabled={isLoading}>
                    Получить ревьювера
                </Button>
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={cls.settingButton}
                    onClick={onSettingButtonClickHandler}
                >
                    <SettingIcon className={cls.settingIcon} />
                </Button>
            </div>
        </form>
    );
};
