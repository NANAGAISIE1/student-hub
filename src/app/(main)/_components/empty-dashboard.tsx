import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import CreateDocument from "./create-document";

const EmptyDashboard = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="/no-document.svg"
        alt="Empty Document"
        height={180}
        width={640}
      />
      <h2>Welcome to Smartnote.</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Create your first hub to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create hub</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[480px] border-none bg-transparent p-0">
            <CreateDocument />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyDashboard;
