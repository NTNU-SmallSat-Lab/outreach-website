import { Skeleton } from "@/components/ui/skeleton";

export default function BlogsLoadingSkeleton() {
  return(
    <div>
        <Skeleton className="w-[56px] max-w-full" />
        <Skeleton className="w-[56px] max-w-full" />
        <Skeleton className="w-[100px] max-w-full" />
        <Skeleton className="w-[56px] max-w-full" />
        <Skeleton className="w-[56px] max-w-full" />
    </div>
);

}