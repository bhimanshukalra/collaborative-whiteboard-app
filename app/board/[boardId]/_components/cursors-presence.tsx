"use client";

import {
  shallow,
  useOthersConnectionIds,
  useOthersMapped,
} from "@liveblocks/react";
import { memo } from "react";
import Cursor from "./cursor";
import { Path } from "./path";
import { rgbToCss } from "@/lib/utils";

const Cursors = () => {
  const otherConnectionIds = useOthersConnectionIds();

  return (
    <>
      {otherConnectionIds.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([connectionId, data]) => {
        if (!data.pencilDraft) {
          return null;
        }
        return (
          <Path
            key={connectionId}
            x={0}
            y={0}
            points={data.pencilDraft}
            fill={data.penColor ? rgbToCss(data.penColor) : "#000"}
          />
        );
      })}
    </>
  );
};

const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

export default CursorsPresence;
