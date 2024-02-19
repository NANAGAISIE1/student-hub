import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FooterProps {
  title: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
  children?: React.ReactNode;
}

export const Footer = ({
  title,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
  children,
}: FooterProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    onClick();
  };

  return (
    <>
      <h4 className="max-w-[calc(100%-20px)] truncate">{title}</h4>
      <div className="flex w-full items-center justify-between">
        <p className="!m-0 truncate text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {createdAtLabel}
        </p>

        <div className="flex w-full items-center justify-end gap-3">
          {children}
          <Button
            disabled={disabled}
            onClick={handleClick}
            size={"icon"}
            className="opacity-0 transition group-hover:opacity-100"
          >
            <Star className={cn("h-4 w-4", isFavorite && "fill-primary")} />
          </Button>
        </div>
      </div>
    </>
  );
};
