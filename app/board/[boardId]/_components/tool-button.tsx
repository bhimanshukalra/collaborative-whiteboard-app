"use client";

import ToolTip from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

function ToolButton({
  Icon,
  label,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) {
  return (
    <ToolTip label={label} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size={"icon"}
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </ToolTip>
  );
}

export default ToolButton;
