import { octokit } from "@/lib/github";
import { useQuery } from "@tanstack/react-query";

async function getUserSearch(search?: string | null) {
  try {
    if (!search) {
      throw new Error("No search term provided");
    }
    const response = await octokit.rest.users.getByUsername({
      username: search,
    });
    return response.data;
  } catch {
    throw new Error("Error fetching user");
  }
}

export function useUserSearch(search?: string | null) {
  return useQuery({
    queryKey: ["user-search", search],
    queryFn: () => getUserSearch(search),
    enabled: !!search,
  });
}
