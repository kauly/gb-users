"use client";

import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

import { useUserSearch } from "@/hooks/use-user-search";
import { UserText } from "@/components/user-text";
import { useEffect } from "react";

export function UserCard() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const { data } = useUserSearch(search);

  useEffect(() => {
    if (data && data.login) {
      replace(`/?q=${search}&login=${data.login}`);
    }
  }, [data, replace, search]);

  if (!data) return null;

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
          {data?.name || data?.login}
        </Link>
        <UserText text={data?.bio} className="text-lg italic" />
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
