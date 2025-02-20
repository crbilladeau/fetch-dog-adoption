/* UI */
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <div className='flex flex-col space-y-3 w-80 h-full border-2 rounded-xl'>
      <Skeleton className='h-[200px] w-full rounded-xl bg-border' />
      <div className='flex flex-col space-y-2 p-6'>
        <Skeleton className='h-4 w-[100px] bg-border' />
        <Skeleton className='h-4 w-[250px] bg-border' />
        <Skeleton className='h-4 w-[100px] bg-border self-end mt-6' />
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className='grid grid-cols-3 gap-8 my-6 mx-auto'>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
