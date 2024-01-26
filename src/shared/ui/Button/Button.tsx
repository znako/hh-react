import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.css";

export enum ButtonTheme {
    CLEAR = "clear",
    PRIMARY = "primary",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    theme?: ButtonTheme;
}

// UI компонент button с возможностью настройки темы
export const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.PRIMARY,
        disabled,
        ...otherProps
    } = props;
    return (
        <button
            className={classNames(cls.Button, { [cls.disabled]: disabled }, [
                className,
                cls[theme],
            ])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};
