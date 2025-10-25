'use client'

import ToolTip from "@/components/tooltip";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

interface OrgListItemProps{
    id: string;
    name: string;
    imageUrl: string;
}

function OrgListItem({id,imageUrl,name}: OrgListItemProps) {
    const{organization} = useOrganization()
    const {setActive} = useOrganizationList()
    const isActive = organization?.id === id

    const onClick = () =>{
        // if(!setActive){
        //     return
        // }
        setActive?.({organization: id});
    }
  return (
    <div className="aspect-square">
      <ToolTip label={name} side="right" align="start" sideOffset={18}>
        <Image
          alt={name}
          src={imageUrl}
          onClick={onClick}
          height={40}
          width={40}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </ToolTip>
    </div>
  );
}

export default OrgListItem