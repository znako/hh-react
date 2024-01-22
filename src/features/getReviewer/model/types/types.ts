import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type GithubUserDataType =
    RestEndpointMethodTypes["repos"]["listContributors"]["response"]["data"][number];

export enum UsersInfoElementView {
    BIG = "big",
    SMALL = "small",
}
