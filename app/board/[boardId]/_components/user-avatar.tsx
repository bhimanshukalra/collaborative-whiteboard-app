import ToolTip from "@/components/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

function UserAvatar({ borderColor, fallback, name, src }: UserAvatarProps) {
  return (
    <ToolTip
      label={name || "Anonymous team mate"}
      side="bottom"
      sideOffset={18}
    >
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </ToolTip>
  );
}

export default UserAvatar;
