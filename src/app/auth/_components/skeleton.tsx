import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const AuthFormSkeleton = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </div>
      <div className="absolute top-0 flex w-full items-center justify-between">
        <div className="!m-0 flex items-center gap-2 text-sm font-medium md:hidden">
          <div className="fill-accent-foreground text-accent-foreground" />
          <Skeleton className="h-full w-full" />
        </div>
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "md:absolute md:right-2 md:top-2",
          )}
        >
          <Skeleton className="h-full w-full" />
        </div>
      </div>
      <div className="relative flex w-full items-center justify-between gap-6">
        <Skeleton className="h-full w-full" />
      </div>
    </>
  );
};

export default AuthFormSkeleton;
