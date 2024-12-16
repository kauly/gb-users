"use client";

import { Input, Spinner } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useDebounce } from "@/hooks/use-debounce";
import { useUserSearch } from "@/hooks/use-user-search";

type SearchInputProps = {
  placeholder?: string;
};

export function SearchInput({ placeholder = "" }: SearchInputProps) {
  const [value, setValue] = useState("");
  const { replace } = useRouter();
  const debouncedValue = useDebounce(value, 500);
  const { isLoading, isError } = useUserSearch(debouncedValue);

  useEffect(() => {
    if (debouncedValue) {
      replace(`/?q=${debouncedValue}`);
    }
  }, [debouncedValue, replace]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch users");
    }
  }, [isError]);

  return (
    <Input
      isClearable={!isLoading}
      placeholder={placeholder}
      radius="lg"
      size="lg"
      startContent={
        <MagnifyingGlass className="pointer-events-none mb-0.5 shrink-0   text-slate-400 dark:text-white/90" />
      }
      value={value}
      onValueChange={setValue}
      endContent={isLoading && <Spinner color="white" />}
    />
  );
}
