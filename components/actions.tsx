"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { MouseEvent, MouseEventHandler, ReactNode } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import useApiMutation from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./confirm-model";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

function Actions({ children, id, title, side, sideOffset }: ActionsProps) {

    const {mutate: deleteBoard,pending: isPendingDeleteBoard} = useApiMutation(api.board.remove)
    const {onOpen: onOpenRenameModal} = useRenameModal()

    const onCopyLink = async () =>{
        try{
            await navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
        toast.success('Link copied')
        
        }catch(error){
            toast.error('Failed to copy link')
        }
    }

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    };

    const handleOnPressDelete = () =>{
        try{
            deleteBoard({id})
            toast.success('Board deleted')
        }catch(error){
            toast.error('Failed to delete board')
        }
    }

    const handleOnClickRename = () =>{
        onOpenRenameModal(id, title);
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={handleOnClick}
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={handleOnClickRename}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board?"
          description="This will delete the board and all of it's contents."
          disabled={isPendingDeleteBoard}
          onConfirm={handleOnPressDelete}
        >
          <Button
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
            variant="ghost"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Actions;
