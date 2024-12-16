"use client";

import { Link } from "@nextui-org/react";
import { use, useEffect } from "react";
import toast from "react-hot-toast";

import { useRepo } from "@/hooks/use-repo";

export type SearchParams = { [key: string]: string | string[] | undefined };
export type NextPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
};

export default function ReposPage({ searchParams }: NextPageProps) {
  const params = use(searchParams);
  const owner = params?.owner as string;
  const repo = params?.repo as string;

  const { data, isError } = useRepo({
    owner: owner || "",
    repo: repo || "",
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch repo");
    }
  }, [isError]);

  return (
    <div className="flex flex-col gap-4 pt-12">
      <Link href={`/?q=${owner}&login=${owner}`}>Go Back</Link>
      <h1 className="pb-2 text-2xl font-bold">Repo</h1>
      <Link
        isExternal
        showAnchorIcon
        href={data?.html_url}
        className="text-lg"
        color="foreground"
      >
        {data?.name}
      </Link>
      <p>{data?.description}</p>
      <p> Stars: {data?.stargazers_count}</p>
      <p> Language: {data?.language}</p>
    </div>
  );
}
