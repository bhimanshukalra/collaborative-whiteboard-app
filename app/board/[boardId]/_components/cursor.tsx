'use client'

import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { memo } from "react"

interface CursorProps {
  connectionId: number;
}

const Cursor = memo(({connectionId}: CursorProps) => {
    const userInfo = useOther(connectionId, (user) => user?.info)
    const cursor = useOther(connectionId, (user)=>user.presence.cursor)

    const name = userInfo?.name || "Anonymous team mate";

    if(!cursor){
        return null
    }

    const {x,y} = cursor

  return (
    <foreignObject style={{ transform: `translateX(${x}px) translateY(${y}px)` }} height={50} width={50} className="relative drop-shadow-md">
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
    </foreignObject>
  );
});

export default Cursor