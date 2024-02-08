"use client";

import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Item } from "./item";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

interface SpaceListProps {
  parentSpaceId?: Id<"spaces">;
  level?: number;
  data?: Doc<"spaces">[];
}

export const SpaceList = ({ parentSpaceId, level = 0 }: SpaceListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const spaces = useQuery(api.spaces.getSidebar, {
    parentSpace: parentSpaceId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/spaces/${documentId}`);
  };

  if (spaces === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden",
        )}
      >
        No pages inside
      </p>
      {spaces.map((space) => (
        <div key={space._id}>
          <Item
            id={space._id}
            onClick={() => onRedirect(space._id)}
            label={space.title}
            icon={FileIcon}
            spaceIcon={space.icon}
            active={params.spaceId === space._id}
            level={level}
            onExpand={() => onExpand(space._id)}
            expanded={expanded[space._id]}
          />
          {expanded[space._id] && (
            <SpaceList parentSpaceId={space._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};
