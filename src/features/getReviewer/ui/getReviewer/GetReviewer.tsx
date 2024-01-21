import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { SettingForm } from "../settingForm/SettingForm";
import cls from "./GetReviewer.module.css";

interface GetReviewerProps {
    className?: string;
}

export const GetReviewer = ({ className }: GetReviewerProps) => {
    return (
        <div className={classNames(cls.GetReviewer, {}, [className])}>
            <SettingForm />
        </div>
    );
};
