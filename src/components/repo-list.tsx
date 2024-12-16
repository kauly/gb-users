"use client";

import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import { Star } from "@phosphor-icons/react";
import { Order, useUserRepos } from "@/hooks/use-user-repos";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function RepoList() {
  const searchParams = useSearchParams();
  const login = searchParams.get("login");
  const [order, setOrder] = useState<Order>(Order.ASC);
  const { data, fetchNextPage } = useUserRepos(login, order);

  const handleOrderChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setOrder(ev.target.value as Order);
  };

  if (!data) return null;

  return (
    <div className="flex h-full flex-col gap-4">
      <h2 className="text-xl font-semibold">Repositories</h2>
      <div className=" flex items-center gap-4">
        <Select className="max-w-xs" label="Sort" onChange={handleOrderChange}>
          <SelectItem key={Order.ASC}>{Order.ASC}</SelectItem>
          <SelectItem key={Order.DESC}>{Order.DESC}</SelectItem>
        </Select>
      </div>
      <div className="h-full max-h-[500px] pb-4 scrollbar-hide">
        <Virtuoso
          data={data?.pages}
          style={{ height: "100%" }}
          className="scrollbar-hide"
          endReached={() => fetchNextPage()}
          itemContent={(i, data) => {
            return (
              <Card
                key={data?.id}
                className="mb-4 w-fit cursor-pointer hover:bg-default-200"
              >
                <CardBody>
                  <div className="flex items-center gap-4">
                    <p className="text-lg">{data?.html_url}</p>
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
