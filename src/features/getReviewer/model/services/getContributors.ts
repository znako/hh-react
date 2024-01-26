import { octokit } from "shared/api/api";
import { ErrorType, GithubUserDataType } from "../types/types";

// Функция для получения контрибутеров репы
export const getContributors = async (login: string, repo: string) => {
    const contributors: Array<GithubUserDataType> = [];
    try {
        // Используем octokit как рекомендуемый инструмент от GitHub
        const iterator = octokit.paginate.iterator(
            octokit.rest.repos.listContributors,
            {
                owner: login,
                repo,
                per_page: 100,
            }
        );
        // Используем iterator, потому что апи предоставляет данные о 500 контрибутерах, следующие будут отображаться как анонимные
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
