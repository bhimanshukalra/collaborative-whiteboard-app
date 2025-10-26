"use client";

import { useParams, useSearchParams } from "next/navigation";
import Canvas from "./_components/canvas";
import Room from "@/components/room";
import Loading from "./_components/loading";

function BoardIdPage() {
  const { boardId } = useParams<{ boardId: string }>();

  return (
    <Room roomId={boardId} fallback={<Loading />}>
      <Canvas boardId={boardId} />
    </Room>
  );
}

export default BoardIdPage;
