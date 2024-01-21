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

export const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.PRIMARY,
        ...otherProps
    } = props;
    return (
        <button
            className={classNames(cls.Button, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
