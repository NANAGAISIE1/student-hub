"use client";
import { DocumentCard } from "./document-card";
import EmptyDashboard from "./empty-dashboard";
import { NewDocumentButton } from "./new-document-button";
import { Doc } from "../../../../convex/_generated/dataModel";

interface DocumentListProps {
  data: Doc<"documents">[] | undefined;
}

export const DocumentList = ({ data }: DocumentListProps) => {
  if (data === undefined) {
    return (
      <div>
        {/* <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2> */}
        <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
          <NewDocumentButton />
          <DocumentCard.Skeleton />
          <DocumentCard.Skeleton />
          <DocumentCard.Skeleton />
          <DocumentCard.Skeleton />
        </div>
      </div>
    );
  }

  // if (!data?.length && query.search) {
  //   // return <EmptySearch />;
  // }

  // if (!data?.length && query.favorites) {
  //   // return <EmptyFavorites />;
  // }

  if (!data?.length) {
    return <EmptyDashboard />;
  }

  return (
    <div>
      {/* <h2 className="text-3xl">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2> */}
      <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-3 ">
        <NewDocumentButton />
        {data?.map((document) => (
          <DocumentCard
            key={document._id}
            id={document._id}
            title={document.title}
            imageUrl={document.coverImage}
            blurHash={document.coverImageBlurHash}
            createdAt={document._creationTime}
          />
        ))}
      </div>
    </div>
  );
};
