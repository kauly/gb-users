"use client";

import { Input, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { useUserSearch } from "@/hooks/use-user-search";
import { SearchIcon } from "./search-icon";
import { useRouter } from "next/navigation";

type SearchInputProps = {
  placeholder?: string;
};

export function SearchInput({ placeholder = "" }: SearchInputProps) {
  const [value, setValue] = useState("");
  const { replace } = useRouter();
  const debouncedValue = useDebounce(value, 500);
  const { isLoading } = useUserSearch(debouncedValue);

  useEffect(() => {
    if (debouncedValue) {
      replace(`/?q=${debouncedValue}`);
    }
  }, [debouncedValue, replace]);

  return (
    <Input
      isClearable={!isLoading}
      placeholder={placeholder}
      radius="lg"
      size="lg"
      startContent={
        <SearchIcon className="pointer-events-none mb-0.5 shrink-0   text-slate-400 dark:text-white/90" />
      }
      value={value}
      onValueChange={setValue}
      endContent={isLoading && <Spinner color="white" />}
    />
  );
}
