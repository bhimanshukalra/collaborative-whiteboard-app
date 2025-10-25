import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavourite: boolean;
  onClick: () => void;
  disabled: boolean;
}

function Footer({
  authorLabel,
  createdAtLabel,
  disabled,
  isFavourite,
  onClick,
  title,
}: FooterProps) {
  return (
    <div className="relative bg-white p-3">
      <p className="text-sm truncate max-w-10/12">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4",
            isFavourite && "fill-blue-600 text-blue-600"
          )}
        />
      </button>
    </div>
  );
}

export default Footer;
