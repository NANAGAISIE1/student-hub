"use client";
import { useQuery } from "convex/react";

import { DocumentCard } from "./document-card";
import { api } from "../../../../convex/_generated/api";

interface DocumentListProps {
  query: {
    search?: string;
    favorites?: string;
  };
}

export const DocumentList = ({ query }: DocumentListProps) => {
  const data = useQuery(api.documents.getSearch);

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {/* <NewBoardButton documentId={documentId} disabled /> */}
          <DocumentCard.Skeleton />
          <DocumentCard.Skeleton />
          <DocumentCard.Skeleton />
          <DocumentCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    // return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    // return <EmptyFavorites />;
  }

  if (!data?.length) {
    // return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {/* <NewBoardButton documentId={documentId} /> */}
        {data?.map((document) => (
          <DocumentCard
            key={document._id}
            id={document._id}
            title={document.title}
            // imageUrl={document.imageUrl}
            // authorId={document.authorId}
            // authorName={document.authorName}
            createdAt={document._creationTime}
            // isFavorite={document.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
