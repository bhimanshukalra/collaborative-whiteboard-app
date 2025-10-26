"use client";

import { useOthersConnectionIds } from "@liveblocks/react";
import { memo } from "react";
import Cursor from "./cursor";

const Cursors = () =>{
    const otherConnectionIds = useOthersConnectionIds()

    return (
      <>
        {otherConnectionIds.map((connectionId) => (
          <Cursor key={connectionId} connectionId={connectionId} />
        ))}
      </>
    );
}

const CursorsPresence = memo(() => {
  return <>
  <Cursors/>
  </>;
});

export default CursorsPresence;
