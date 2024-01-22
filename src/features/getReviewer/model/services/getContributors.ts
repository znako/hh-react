import { octokit } from "shared/api/api";
import { GithubUserDataType } from "../types/types";

interface ErrorType extends Error {
    response: { status: number };
}

export const getContributors = async (login: string, repo: string) => {
    const contributors: Array<GithubUserDataType> = [];
    try {
        const iterator = octokit.paginate.iterator(
            octokit.rest.repos.listContributors,
            {
                owner: login,
                repo,
                per_page: 100,
            }
        );
        // iterate through each response
        for await (const response of iterator) {
            const { data: users } = response;
            for (const user of users) {
                contributors.push(user);
            }
        }
        return contributors;
    } catch (error) {
        const { response } = error as ErrorType;
        let message: string;
        if (response) {
            if (response.status === 404) {
                message = "Данные не найдены";
            } else {
                message = "Что-то пошло не так, попробуйте позже";
            }
        } else {
            message = "Проблема с интернетом, попробуйте еще раз";
        }
        console.error(message);
        return Promise.reject(message);
    }
};
