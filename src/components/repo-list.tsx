"use client";

import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { Star } from "@phosphor-icons/react";
import { Virtuoso } from "react-virtuoso";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { Order, useUserRepos } from "@/hooks/use-user-repos";

export function RepoList() {
  const searchParams = useSearchParams();
  const login = searchParams.get("login");
  const [order, setOrder] = useState<Order>(Order.ASC);
  const { data, fetchNextPage, isError } = useUserRepos(login, order);

  const handleOrderChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setOrder(ev.target.value as Order);
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch repo");
    }
  }, [isError]);

  if (!data) return null;

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto">
      <h2 className="text-xl font-semibold">Repositories</h2>
      <div className=" flex items-center gap-4">
        <Select className="max-w-xs" label="Sort" onChange={handleOrderChange}>
          <SelectItem key={Order.ASC}>{Order.ASC}</SelectItem>
          <SelectItem key={Order.DESC}>{Order.DESC}</SelectItem>
        </Select>
      </div>
      <div className="flex h-[500px] flex-col overflow-y-auto pb-4 scrollbar-hide">
        <Virtuoso
          data={data?.pages}
          style={{ height: "100%" }}
          className="scrollbar-hide"
          endReached={() => fetchNextPage()}
          itemContent={(i, data) => {
            return (
              <Card key={data?.id} className="mb-4 w-fit  hover:bg-default-200">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/repos?owner=${data.owner.login}&repo=${data.name}`}
                      className="hover:underline"
                    >
                      {data?.html_url}
                    </Link>
                    <div className="flex items-center gap-2">
                      <Star />
                      <p className="text-lg">{data?.stargazers_count}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          }}
        />
      </div>
    </div>
  );
}
