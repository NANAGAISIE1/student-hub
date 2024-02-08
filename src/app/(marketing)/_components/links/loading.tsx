import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { navigationLinks } from "@/constants/navigation-links";

const LoadingSkeleton = () => {
  return (
    <ul className="w-full list-none space-y-4">
      {navigationLinks.map((nav) => (
        <>
          <li key={nav.href}>
            <Skeleton className="flex h-8 w-full items-center rounded-sm" />
          </li>
          <Separator />
        </>
      ))}
    </ul>
  );
};

export default LoadingSkeleton;
