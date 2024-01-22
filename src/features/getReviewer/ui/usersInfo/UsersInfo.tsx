import {
    GithubUserDataType,
    UsersInfoElementView,
} from "../../model/types/types";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { UserInfoElement } from "./userInfoElement/UserInfoElement";
import cls from "./UsersInfo.module.css";
import { Loader } from "shared/Loader/Loader";

interface UsersInfoProps {
    className?: string;
    owner: GithubUserDataType | null;
    reviewer: GithubUserDataType | null;
    restContributors: Array<GithubUserDataType>;
    isLoading: boolean;
}

export const UsersInfo = (props: UsersInfoProps) => {
    const { className, owner, reviewer, restContributors, isLoading } = props;

    if (isLoading) {
        return (
            <div
                className={classNames(cls.UsersInfo, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <Loader className={cls.loader} />
            </div>
        );
    }

    if (!owner) {
        return <></>;
    }

    return (
        <div className={classNames(cls.UsersInfo, {}, [className])}>
            <div
                className={classNames(cls.personalInfoContainer, {}, [
                    cls.container,
                ])}
            >
                <h3>Вы</h3>
                <UserInfoElement data={owner} className={cls.userInfoElement} />
            </div>
            <div
                className={classNames(cls.otherInfoContainer, {}, [
                    cls.container,
                ])}
            >
                <h3>Предлагаемый ревьювер</h3>
                {!reviewer ? (
                    <div className={cls.message}>
                        Слишком мало контрибьютеров, чтобы назначить ревьювера
                    </div>
                ) : (
                    <>
                        <UserInfoElement
                            data={reviewer}
                            className={cls.userInfoElement}
                        />
                        <div className={cls.restContributorsContainer}>
                            <h3>Еще варианты</h3>
                            {!restContributors.length ? (
                                <div className={cls.message}>
                                    Нет других вариантов
                                </div>
                            ) : (
                                <>
                                    {restContributors.map((contributor) => (
                                        <UserInfoElement
                                            key={contributor.id}
                                            data={contributor}
                                            className={cls.userInfoElement}
                                            view={UsersInfoElementView.SMALL}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
