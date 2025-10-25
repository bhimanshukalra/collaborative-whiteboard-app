"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import useApiMutation from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { toast } from "sonner";

function EmptyBoards() {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const handleOnClick = async () => {
    if (!organization) {
      return;
    }
    try {
      const id = await mutate({ orgId: organization.id, title: "Untitled" });
      toast.success("Board created");
    } catch (error) {
      toast.error("Failed to create board");
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center h-full">
      <Image src="/no-board.svg" height={110} width={110} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={handleOnClick} disabled={pending}>
          Create board
        </Button>
      </div>
    </div>
  );
}

export default EmptyBoards;
