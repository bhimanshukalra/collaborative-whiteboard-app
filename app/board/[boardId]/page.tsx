"use client";

import { useParams, useSearchParams } from "next/navigation";
import Canvas from "./_components/canvas";

function BoardIdPage() {
  const { boardId } = useParams<{ boardId: string }>();
  
  return (
    <>
      <Canvas boardId={boardId} />
    </>
  );
}

export default BoardIdPage;
