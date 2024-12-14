import { SearchInput } from "@/components/search-input";

export default async function Home() {
  return (
    <main className="flex h-screen w-full justify-center bg-gradient-to-tr from-slate-400 to-black px-4 pt-8 md:pt-12">
      <div className="w-full max-w-lg">
        <SearchInput placeholder="Search for an user name..." />
      </div>
    </main>
  );
}
