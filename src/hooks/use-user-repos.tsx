import { useInfiniteQuery } from "@tanstack/react-query";

import { octokit } from "@/lib/github";

export enum Order {
  ASC = "asc",
  DESC = "desc",
}
type GetUserReposParams = {
  pageParam: number;
  queryKey: (string | null | undefined)[];
};

async function getUserRepos({ pageParam, queryKey }: GetUserReposParams) {
  const [, login] = queryKey;
  try {
    if (!login) {
      throw new Error("No login provided");
    }
    const response = await octokit.rest.repos.listForUser({
      username: login,
      page: pageParam,
      per_page: 30,
    });
    const linkHeader = response?.headers?.link;
    const hasNextPage = linkHeader && linkHeader.includes(`rel=\"next\"`);

    return {
      data: response.data,
      nextPage: hasNextPage ? pageParam + 1 : null,
    };
  } catch {
    throw new Error("Error fetching user repositories");
  }
}

export function useUserRepos(login?: string | null, order: Order = Order.ASC) {
  return useInfiniteQuery({
    queryKey: ["user-repos", login],
    queryFn: getUserRepos,
    initialPageParam: 1,
    enabled: !!login,
    getNextPageParam: (data) => data.nextPage,
    select: (data) => ({
      pages: data.pages
        .flatMap((page) => page.data)
        .sort((a, b) => {
          if (
            typeof a?.stargazers_count === "number" &&
            typeof b?.stargazers_count === "number"
          ) {
            return order === "asc"
              ? a.stargazers_count - b.stargazers_count
              : b.stargazers_count - a.stargazers_count;
          } else {
            return 0;
          }
        }),
    }),
  });
}
