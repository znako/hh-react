import React, { useState } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import cls from "./SettingForm.module.css";
import { ReactComponent as SettingIcon } from "shared/assets/settings.svg";

export const SettingForm = () => {
    const [settingShow, setSettingShow] = useState<boolean>(true);
    const [login, setLogin] = useState<string>("");
    const [repo, setRepo] = useState<string>("");
    const [blacklist, setBlacklist] = useState<string>("");

    const onSettingButtonClickHandler = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        event.preventDefault();
        setSettingShow(!settingShow);
    };

    return (
        <form>
            {settingShow && (
                <>
                    <Input
                        label="Ваш логин"
                        value={login}
                        onChange={setLogin}
                        name="login"
                        className={cls.input}
                        autoFocus
                    />
                    <Input
                        label="Репозиторий"
                        value={repo}
                        onChange={setRepo}
                        name="repo"
                        className={cls.input}
                    />
                    <Input
                        label="Блэк-лист (логины через пробел)"
                        value={blacklist}
                        onChange={setBlacklist}
                        name="blacklist"
                        className={cls.input}
                    />
                </>
            )}
            <div className={cls.ButtonsWrapper}>
                <Button>Получить ревьювера</Button>
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
