"use client";
import { useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Actions } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { convertBlurHashToDataUrl } from "@/lib/utils";

import { Footer } from "./footer";
import { Overlay } from "./overlay";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

interface BoardCardProps {
  id: Id<"documents">;
  title: string;
  createdAt: number;
  imageUrl?: string;
  blurHash?: string;
}

export const DocumentCard = ({
  id,
  title,
  createdAt,
  imageUrl,
  blurHash,
}: BoardCardProps) => {
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const isFavorite = useQuery(api.document.isFavorite, {
    documentId: id,
  });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.document.favorite,
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.document.unfavorite,
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      onFavorite({ id }).catch(() => toast.error("Failed to favorite"));
    }
  };
  const blurDataUrl = convertBlurHashToDataUrl(blurHash as string, 127, 100);

  return (
    <Link href={`/dashboard/${id}`}>
      <Card className="group relative flex aspect-[127/100] flex-col justify-between overflow-hidden">
        <CardContent className="absolute flex h-full w-full">
          <Image
            src={imageUrl as string}
            placeholder="blur"
            blurDataURL={blurDataUrl as string}
            alt={title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-fit aspect-[127/100] object-fill"
            quality={100}
          />
          <Overlay />
        </CardContent>

        <CardFooter className="absolute bottom-0 flex w-full flex-col items-center justify-between bg-background/50">
          <Footer
            isFavorite={isFavorite || false}
            title={title}
            createdAtLabel={createdAtLabel}
            onClick={toggleFavorite}
            disabled={pendingFavorite || pendingUnfavorite}
          >
            <Actions id={id} title={title} side="right">
              <Button
                className="opacity-0 outline-none transition-opacity group-hover:opacity-100"
                size={"icon"}
              >
                <MoreHorizontal className="h-4 w-4 opacity-75 transition-opacity hover:opacity-100" />
              </Button>
            </Actions>
          </Footer>
        </CardFooter>
      </Card>
    </Link>
  );
};

DocumentCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[127/100] overflow-hidden rounded-lg">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
