import { getContributors } from "./getContributors";
import { GithubUserDataType, OwnerReviewerRestType } from "../types/types";

export const getRandomReviewer = async (
    login: string,
    repo: string,
    blacklist: string
) => {
    if (!login || !repo) {
        return Promise.reject("Поле логин и репозиторий обязательны");
    }
    let contributors: Array<GithubUserDataType>;
    try {
        contributors = await getContributors(login, repo);
        console.log(contributors);
    } catch (error) {
        return Promise.reject(error);
    }
    const OwnerReviewerRest: OwnerReviewerRestType = {
        owner: null,
        reviewer: null,
        rest: [],
    };
    if (contributors.length) {
        const bl = blacklist.split(" ");
        if (!bl.includes(login)) {
            bl.push(login);
        }
        const whitelistContributors: Array<GithubUserDataType> = [];
        contributors.forEach((contr) => {
            if (contr.login && !bl.includes(contr.login)) {
                whitelistContributors.push(contr);
            }
            if (contr.login === login) {
                OwnerReviewerRest.owner = contr;
            }
        });
        OwnerReviewerRest.reviewer = whitelistContributors.length
            ? whitelistContributors[
                  Math.floor(Math.random() * whitelistContributors.length)
              ]
            : null;
        OwnerReviewerRest.rest = whitelistContributors.filter(
            (contr) => contr.login !== OwnerReviewerRest.reviewer?.login
        );
    }
    return OwnerReviewerRest;
};
