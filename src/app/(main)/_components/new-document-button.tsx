"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import CreateDocument from "./create-document";

interface NewDocumentButtonProps {
  disabled?: boolean;
}

export const NewDocumentButton = ({ disabled }: NewDocumentButtonProps) => {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card>
          <CardContent className="m-0 h-full w-full p-0">
            <Button
              disabled={disabled}
              variant={"ghost"}
              className={cn(
                "col-span-1 flex h-full w-full flex-col items-center  justify-center rounded-lg py-6",
                disabled && "cursor-not-allowed opacity-75",
              )}
            >
              <Plus className="h-8 w-8" />
              <p>Create hub</p>
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-[480px] border-none bg-transparent p-0">
        <CreateDocument />
      </DialogContent>
    </Dialog>
  );
};
