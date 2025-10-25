import { api } from "@/convex/_generated/api";
import useApiMutation from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

function NewBoardButton({ orgId, disabled }: NewBoardButtonProps) {
  const { mutate: createBoard, pending } = useApiMutation(api.board.create);

  const handleOnClick = async () => {
    try {
      const id = await createBoard({ orgId, title: "Untitled" });
      toast.success("Board created");
    } catch (err) {
      toast.error("Failed to create board");
    }
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={handleOnClick}
      className={cn(
        "col-span-1 aspect-100/127 bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6 cursor-pointer",
        (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
}

export default NewBoardButton;
