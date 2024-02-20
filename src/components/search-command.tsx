"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import { File, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSearch } from "@/hooks/store/use-search-dialog";

import { Hint } from "./hint";
import { Button } from "./ui/button";
import { api } from "../../convex/_generated/api";

export const SearchCommand = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const collapsed = isCollapsed || true;
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [searchParam, setSearchParam] = useState("");
  const documents = useQuery(api.documents.getAll, {
    searchParam: searchParam,
  });
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/dashboard/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Command>
      {isCollapsed ? (
        <Hint label="Search... ⌘K" side="right" align="center" sideOffset={10}>
          <Button
            onClick={toggle}
            variant={"ghost"}
            size={"icon"}
            className="h-9 w-9"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </Hint>
      ) : (
        <Hint label="Search... ⌘K" side="right" align="center" sideOffset={10}>
          <Button onClick={toggle} variant={"ghost"} className="w-full">
            <div className="flex w-full items-center justify-between overflow-x-clip">
              <div className="flex items-center">
                <Search className="h-4 w-4" />
                <p className="!mt-0 ml-2">Search space...</p>
              </div>
              <kbd>⌘K</kbd>
            </div>
            <span className="sr-only">Search</span>
          </Button>
        </Hint>
      )}

      <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput
          placeholder={`Search ${user?.given_name}'s Jotion...`}
          onValueChange={(value) => setSearchParam(value)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documents">
            {documents
              ?.sort((a, b) => {
                // Convert names to lowercase for case-insensitive sorting
                const nameA = a.title.toLowerCase();
                const nameB = b.title.toLowerCase();

                // Compare the names
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
              })
              .map((document) => (
                <CommandItem
                  key={document._id}
                  value={`${document.title}`}
                  title={document.title}
                  onSelect={() => onSelect(document._id)}
                >
                  {document.icon ? (
                    <p className="mr-2 text-[18px]">{document.icon}</p>
                  ) : (
                    <File className="mr-2 h-4 w-4" />
                  )}
                  <span>{document.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Command>
  );
};
