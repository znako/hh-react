import React, { InputHTMLAttributes } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Input.module.css";

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    label?: string;
    value: string;
    onChange: (value: string) => void;
}

export const Input = (props: InputProps) => {
    const { className, label, value, onChange, name, autoFocus } = props;

    const onChangeEventHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        onChange(event.target.value);
    };

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {label && (
                <label className={cls.label} htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                type="text"
                value={value}
                onChange={onChangeEventHandler}
                id={name}
                name={name}
                className={cls.input}
                autoFocus={autoFocus}
            />
        </div>
    );
};
