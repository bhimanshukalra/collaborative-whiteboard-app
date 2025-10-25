'use client'

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";

function SearchInput() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const url = qs.stringifyUrl(
        {
          url: "/",
          query: { search: searchTerm },
        },
        { skipEmptyString: true, skipNull: true }
      );
      router.push(url);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  return (
    <div className="w-full relative">
      <Search className="absolute text-muted-foreground h-4 w-4 top-1/2 left-3 transform -translate-y-1/2" />
      <Input
        className="w-full max-w-3xs pl-9"
        placeholder="Search boards"
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchInput;
