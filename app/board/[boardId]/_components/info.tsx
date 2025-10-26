"use client";

import Actions from "@/components/actions";
import ToolTip from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-rename-modal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeperator = () => <div className="text-neutral-300 px-1.5">|</div>;

export function Info({ boardId }: InfoProps) {
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });
  const { onOpen } = useRenameModal();

  if (!data) {
    return <InfoSkeleton />;
  }

  const handleOnPressName = () => {
    onOpen(data._id, data.title);
  };

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-14 flex items-center shadow-md">
      <ToolTip label="Go to boards" side="bottom" sideOffset={10}>
        <Button className="h-10/12" variant="board" asChild>
          <Link href="/">
            <Image src="/logo.svg" alt="Board Logo" height={40} width={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </ToolTip>
      <TabSeperator />
      <ToolTip label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant={"board"}
          className="h-10/12 text-base font-normal px-2"
          onClick={handleOnPressName}
        >
          {data.title}
        </Button>
      </ToolTip>
      <TabSeperator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <ToolTip label="Main menu" side="bottom" sideOffset={10}>
            <Button size={"icon"} variant={"board"}>
              <Menu />
            </Button>
          </ToolTip>
        </div>
      </Actions>
    </div>
  );
}

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-3xs" />
  );
}
