import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow">
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-1/4 mt-2" />
    </div>
  );
};

export default SkeletonCard;
