import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDark = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-black shadow">
      <Skeleton className="h-64 w-full bg-black" />
    </div>
  );
};

export default SkeletonDark;
