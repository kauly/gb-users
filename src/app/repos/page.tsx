"use client";

import { useSearchParams } from "next/navigation";
import { Link } from "@nextui-org/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { useRepo } from "@/hooks/use-repo";

export default function ReposPage() {
  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

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
