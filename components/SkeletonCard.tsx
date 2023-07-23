import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow">
      <Skeleton className="h-64 w-full" />
    </div>
  );
};

export default SkeletonCard;
