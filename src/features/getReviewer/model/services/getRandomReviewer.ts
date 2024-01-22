import { getContributors } from "./getContributors";
import { GithubUserDataType } from "../types/types";

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
    const reviewerAndRest: {
        owner: GithubUserDataType | null;
        reviewer: GithubUserDataType | null;
        rest: Array<GithubUserDataType>;
    } = { owner: null, reviewer: null, rest: [] };
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
                reviewerAndRest.owner = contr;
            }
        });
        reviewerAndRest.reviewer = whitelistContributors.length
            ? whitelistContributors[
                  Math.floor(Math.random() * whitelistContributors.length)
              ]
            : null;
        reviewerAndRest.rest = whitelistContributors.filter(
            (contr) => contr.login !== reviewerAndRest.reviewer?.login
        );
    }
    return reviewerAndRest;
};
