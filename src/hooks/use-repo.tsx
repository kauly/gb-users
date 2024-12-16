"use client";

import { useQuery } from "@tanstack/react-query";

import { octokit } from "@/lib/github";

type GetRepoProps = {
  owner: string;
  repo: string;
};
async function getRepo(props: GetRepoProps) {
  try {
    if (!props.owner || !props.repo) {
      throw new Error("No owner or repo provided");
    }
    const response = await octokit.rest.repos.get(props);
    return response.data;
  } catch {
    throw new Error("Error fetching repo");
  }
}

export function useRepo(props: GetRepoProps) {
  return useQuery({
    queryKey: ["repo", props],
    queryFn: () => getRepo(props),
    enabled: !!props.owner && !!props.repo,
  });
}
