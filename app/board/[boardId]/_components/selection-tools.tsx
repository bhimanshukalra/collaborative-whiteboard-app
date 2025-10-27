"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@liveblocks/react";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import ToolTip from "@/components/tooltip";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Button } from "@/components/ui/button";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const selectionBounds = useSelectionBounds();
    const deleteLayers = useDeleteLayers();

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let index = 0; index < arr.length; index++) {
          if (selection?.includes(arr[index])) {
            indices.push(index);
          }
        }

        for (let index = 0; index < indices.length; index++) {
          liveLayerIds.move(indices[index], index);
        }
      },
      [selection]
    );

    const bringToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let index = 0; index < arr.length; index++) {
          if (selection?.includes(arr[index])) {
            indices.push(index);
          }
        }

        for (let index = indices.length - 1; index >= 0; index--) {
          liveLayerIds.move(
            indices[index],
            arr.length - 1 - (indices.length - 1 - index)
          );
        }
      },
      [selection]
    );

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <ToolTip label="Bring to front">
            <Button variant="board" size={"icon"} onClick={bringToFront}>
              <BringToFront />
            </Button>
          </ToolTip>
          <ToolTip label="Send to back" side="bottom">
            <Button variant="board" size={"icon"} onClick={moveToBack}>
              <SendToBack />
            </Button>
          </ToolTip>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <ToolTip label="Delete">
            <Button variant={"board"} size={"icon"} onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </ToolTip>
        </div>
      </div>
    );
  }
);

export default SelectionTools;
