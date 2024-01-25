import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type GithubUserDataType =
    RestEndpointMethodTypes["repos"]["listContributors"]["response"]["data"][number];

export interface SettingFormType {
    login: string;
    repo: string;
    blacklist: string;
}

export interface OwnerReviewerRestType {
    owner: GithubUserDataType | null;
    reviewer: GithubUserDataType | null;
    rest: Array<GithubUserDataType>;
}

export enum UsersInfoElementView {
    BIG = "big",
    SMALL = "small",
}

export interface ErrorType extends Error {
    response: { status: number };
}

export interface Action<T, P> {
    readonly type: T;
    readonly payload?: P;
}

export interface GetReviewerSchema
    extends SettingFormType,
        OwnerReviewerRestType {
    isLoading: boolean;
    error: string;
}
