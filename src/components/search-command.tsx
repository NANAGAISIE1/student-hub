"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import { File, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSidebar } from "@/hooks/store/side-bar";
import { useSearch } from "@/hooks/store/use-search-dialog";

import { Hint } from "./hint";
import { Button } from "./ui/button";
import { api } from "../../convex/_generated/api";

export const SearchCommand = () => {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);
  const isSidebarOpen = useSidebar((store) => store.isOpen);

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
    <>
      <Button
        onClick={toggle}
        size={isSidebarOpen ? "default" : "icon"}
        variant={"ghost"}
      >
        {isSidebarOpen ? (
          <div className="flex w-full items-center justify-between overflow-x-clip">
            <p className="!m-0">Search space...</p>
            <kbd>⌘K</kbd>
          </div>
        ) : (
          <Hint
            label="Search... ⌘K"
            side="right"
            align="center"
            sideOffset={10}
          >
            <Search className="w-8 min-w-8" />
          </Hint>
        )}
      </Button>

      <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput placeholder={`Search ${user?.given_name}'s Jotion...`} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documents">
            {documents?.map((document) => (
              <CommandItem
                key={document._id}
                value={`${document._id}-${document.title}`}
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
    </>
  );
};
