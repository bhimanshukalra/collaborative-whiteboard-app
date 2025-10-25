"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyOrg from "./_components/empty-org";
import { useSearchParams } from "next/navigation";
import BoardList from "./_components/board-list";

export default function Home() {
  const { organization } = useOrganization();
  const searchParams = useSearchParams();
  const favourites = searchParams.get("favourites");
  const search = searchParams.get("search");
  const queryParams = { favourites, search };

  return (
    <div className="flex-1 h-full p-6">
      {organization ? (
        <BoardList orgId={organization.id} query={queryParams} />
      ) : (
        <EmptyOrg />
      )}
    </div>
  );
}
