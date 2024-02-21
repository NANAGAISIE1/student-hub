"use client";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const NovelEditor = useMemo(
    () => dynamic(() => import("@/components/editor/editor"), { ssr: false }),
    [],
  );

  const document = useQuery(api.document.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.document.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content: content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="container pb-40">
      <Cover url={document.coverImage} blurHash={document.coverImageBlurHash} />
      <div className="w-full">
        <Toolbar initialData={document} />
        <NovelEditor
          onChange={onChange}
          initialContent={document.content}
          documentId={document._id}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
