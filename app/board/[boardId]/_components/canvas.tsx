"use client";

import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useSelf,
} from "@liveblocks/react/suspense";
import { Info } from "./info";
import { Participants } from "./participants";
import { ToolBar } from "./toolbar";
import { PointerEvent, useCallback, useState, WheelEvent } from "react";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import CursorsPresence from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

interface CanvasProps {
  boardId: string;
}

function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((event: WheelEvent) => {
    setCamera((prev) => ({
      x: prev.x - event.deltaX,
      y: prev.y - event.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(({ setMyPresence }, e: PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, camera);
    setMyPresence({ cursor: current });
  }, []);

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <ToolBar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
}

export default Canvas;
