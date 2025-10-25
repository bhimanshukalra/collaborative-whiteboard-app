"use client";

import ToolTip from "@/components/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

const AddOrgButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <ToolTip label="Create organization" side="right" align="start" sideOffset={18}>
            <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition cursor-pointer">
              <Plus className="text-white" />
            </button>
          </ToolTip>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none w-[430px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default AddOrgButton;