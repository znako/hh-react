import {
    GithubUserDataType,
    UsersInfoElementView,
} from "../../../model/types/types";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./UserInfoElement.module.css";

interface UserInfoElementProps {
    className?: string;
    data: GithubUserDataType;
    view?: UsersInfoElementView;
}

export const UserInfoElement = (props: UserInfoElementProps) => {
    const { className, data, view = UsersInfoElementView.BIG } = props;

    // const content =
    //     view === UsersInfoElementView.BIG ? (
    //         <>
    //             {data.avatar_url && (
    //                 <img
    //                     src={data.avatar_url}
    //                     alt={data.login}
    //                     className={cls.image}
    //                 />
    //             )}
    //             <div>
    //                 {" "}
    //                 <span className={cls.infoTitle}> Логин: </span>
    //                 {data.login}
    //             </div>
    //             {data.html_url && (
    //                 <div>
    //                     <span className={cls.infoTitle}>
    //                         <a
    //                             href={data.html_url}
    //                             target="_blank"
    //                             rel="noreferrer"
    //                         >
    //                             Ссылка на github
    //                         </a>
    //                     </span>
    //                 </div>
    //             )}
    //         </>
    //     ) : (
    //         <>

    //         </>
    //     );

    return (
        <div
            className={classNames(cls.UserInfoElement, {}, [
                className,
                cls[view],
            ])}
        >
            {data.avatar_url && (
                <img
                    src={data.avatar_url}
                    alt={data.login}
                    className={classNames(cls.image, {}, [cls[view]])}
                />
            )}
            <div>
                {" "}
                <span className={cls.infoTitle}> Логин: </span>
                {data.login}
            </div>
            {data.html_url && (
                <div>
                    <span className={cls.infoTitle}>
                        <a
                            href={data.html_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Ссылка на github
                        </a>
                    </span>
                </div>
            )}
        </div>
    );
};
