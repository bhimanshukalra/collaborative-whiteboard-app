import { useSelf } from "@liveblocks/react/suspense";
import { Info } from "./info";
import { Participants } from "./participants";
import { ToolBar } from "./toolbar";

interface CanvasProps {
  boardId: string;
}

function Canvas({ boardId }: CanvasProps) {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <ToolBar />
    </main>
  );
}

export default Canvas;
