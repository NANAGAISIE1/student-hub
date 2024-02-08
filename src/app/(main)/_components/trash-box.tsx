"use client";

import { useQuery, useMutation } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmModal } from "@/components/modals/confirm";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const spaces = useQuery(api.spaces.getTrash);
  const restore = useMutation(api.spaces.restore);
  const remove = useMutation(api.spaces.remove);

  const [search, setSearch] = useState("");

  const filteredSpaces = spaces?.filter((space) => {
    return space.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (spaceId: string) => {
    router.push(`/spaces/${spaceId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    spaceId: Id<"spaces">,
  ) => {
    event.stopPropagation();
    const promise = restore({ id: spaceId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: " Failed to restore note.",
    });
  };

  const onRemove = (spaceId: Id<"spaces">) => {
    const promise = remove({ id: spaceId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: " Failed to delete note.",
    });

    if (params.spaceId === spaceId) {
      router.push("/spaces");
    }
  };

  if (spaces === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          No spaces found.
        </p>
        {filteredSpaces?.map((space) => (
          <div
            key={space._id}
            role="button"
            onClick={() => onClick(space._id)}
            className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
          >
            <span className="truncate pl-2">{space.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, space._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(space._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
