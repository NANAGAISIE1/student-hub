import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    onClick();
  };

  return (
    <div className="relative bg-white p-3">
      <p className="max-w-[calc(100%-20px)] truncate text-[13px]">{title}</p>
      <p className="truncate text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {authorLabel}, {createdAtLabel}
      </p>
      <Button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "absolute right-3 top-3 text-muted-foreground opacity-0 transition hover:text-blue-600 group-hover:opacity-100",
          disabled && "cursor-not-allowed opacity-75",
        )}
      >
        <Star
          className={cn("h-4 w-4", isFavorite && "fill-blue-600 text-blue-600")}
        />
      </Button>
    </div>
  );
};
