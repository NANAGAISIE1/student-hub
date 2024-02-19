import { Check, Trash } from "lucide-react";
import { useEditor } from "novel";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (e) {
    return null;
  }
}
interface LinkSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { editor } = useEditor();

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });
  if (!editor) return null;

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="gap-2 rounded-none border-none">
          <p className="!mt-0 text-base">↗</p>
          <p
            className={cn(
              "!mt-0 underline decoration-stone-400 underline-offset-4",
              {
                "text-blue-500": editor.isActive("link"),
              },
            )}
          >
            Link
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        side="right"
        className="w-60 p-0"
        sideOffset={10}
      >
        <form
          onSubmit={(e) => {
            const target = e.currentTarget as HTMLFormElement;
            e.preventDefault();
            const input = target[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            url && editor.chain().focus().setLink({ href: url }).run();
          }}
          className="flex  p-1 "
        >
          <div className="flex items-center gap-3">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Paste a link"
              defaultValue={editor.getAttributes("link").href || ""}
            />
            {editor.getAttributes("link").href ? (
              <Button
                size="icon"
                variant="outline"
                type="button"
                className="flex h-full items-center rounded-sm p-1 text-destructive transition-all hover:bg-warning-light dark:hover:bg-warning-dark"
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                }}
              >
                <Trash className="h-6 w-6" />
              </Button>
            ) : (
              <Button size="icon" className="h-full">
                <Check className="h-6 w-6" />
              </Button>
            )}
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
