import { RepoList } from "@/components/repo-list";
import { SearchInput } from "@/components/search-input";
import { UserCard } from "@/components/user-card";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex  w-full flex-col gap-8 px-4 pt-8 md:gap-12 md:pt-12">
      <div className="mx-auto w-full max-w-xl">
        <SearchInput placeholder="Search for an user name..." />
      </div>
      <Suspense>
        <UserCard />
        <RepoList />
      </Suspense>
    </main>
  );
}
