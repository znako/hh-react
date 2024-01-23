import { getContributors } from "./getContributors";
import { GithubUserDataType, OwnerReviewerRestType } from "../types/types";

// Функция для получения рандомного ревьювера из тех контрибутеров, которых вернула функция getContributors
export const getRandomReviewer = async (
    login: string,
    repo: string,
    blacklist: string
) => {
    // Валидация
    if (!login || !repo) {
        return Promise.reject("Поле логин и репозиторий обязательны");
    }

    let contributors: Array<GithubUserDataType>;
    try {
        contributors = await getContributors(login, repo);
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
        // Добавляем в bl login пользователя, который ищет
        if (!bl.includes(login)) {
            bl.push(login);
        }
        // Фильтруем контрибуторов с учетом bl, если среди них есть данные пользователя, который делает запрос, то сохраняем
        const whitelistContributors: Array<GithubUserDataType> = [];
        contributors.forEach((contr) => {
            if (contr.login && !bl.includes(contr.login)) {
                whitelistContributors.push(contr);
            }
            if (contr.login === login) {
                OwnerReviewerRest.owner = contr;
            }
        });
        // Получаем рандомного ревьювера
        OwnerReviewerRest.reviewer = whitelistContributors.length
            ? whitelistContributors[
                  Math.floor(Math.random() * whitelistContributors.length)
              ]
            : null;
        // Сохраняем оставшихся
        OwnerReviewerRest.rest = whitelistContributors.filter(
            (contr) => contr.login !== OwnerReviewerRest.reviewer?.login
        );
    }
    return OwnerReviewerRest;
};
