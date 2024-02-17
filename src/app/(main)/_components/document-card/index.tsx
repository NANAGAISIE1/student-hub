"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Actions } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Footer } from "./footer";
import { Overlay } from "./overlay";
import { Id } from "../../../../../convex/_generated/dataModel";

interface BoardCardProps {
  id: Id<"documents">;
  title: string;
  authorName?: string;
  authorId?: string;
  createdAt: number;
  imageUrl?: string;
  isFavorite?: boolean;
}

export const DocumentCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  isFavorite,
}: BoardCardProps) => {
  const { user } = useKindeBrowserClient();
  const userId = user?.id;

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  //   const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
  //     api.documents.favorite,
  //   );
  //   const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
  //     api.documents.unfavorite,
  //   );

  const toggleFavorite = () => {
    // if (isFavorite) {
    //   onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    // } else {
    //   onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
    // }
    console.log("Favorite toggled");
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={imageUrl || "/error.svg"}
            alt={title}
            fill
            className="object-fit"
          />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <Button className="absolute right-1 top-1 px-3 py-2 opacity-0 outline-none transition-opacity group-hover:opacity-100">
              <MoreHorizontal className="text-white opacity-75 transition-opacity hover:opacity-100" />
            </Button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite || false}
          title={title}
          authorLabel={authorLabel || "Unknown author"}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          //   disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

DocumentCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] overflow-hidden rounded-lg">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
