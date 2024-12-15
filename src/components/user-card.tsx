"use client";

import { useUserSearch } from "@/hooks/use-user-search";
import { Image } from "@nextui-org/image";
import { useSearchParams } from "next/navigation";
import { UserText } from "./user-text";
import { Link } from "@nextui-org/react";

//número de seguidores, número de seguidos, imagem do avatar, e-mail e bio

export function UserCard() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const { data } = useUserSearch(search);

  return (
    <div className="flex w-full flex-col items-center gap-8 md:flex-row">
      <Image
        src={data?.avatar_url}
        height={200}
        width={200}
        className="object-cover"
        shadow="md"
        alt="User avatar"
        isBlurred
      />

      <div className="flex flex-col gap-4 p-4">
        <Link
          isExternal
          showAnchorIcon
          href={data?.html_url}
          className="text-lg"
        >
          {data?.name}
        </Link>
        <UserText text={data?.bio} className="text-lg" />
        <UserText title="Email:" text={data?.email} className="text-lg" />
        <UserText
          title="Followers:"
          text={data?.followers}
          className="text-lg"
        />
        <UserText
          title="Following:"
          text={data?.following}
          className="text-lg"
        />
      </div>
    </div>
  );
}
