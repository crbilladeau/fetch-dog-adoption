/* UI */
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

/* Types */
import { DogsSearchParams } from '../../../hooks/types/FetchDogs';

interface PaginationControlsProps {
  setParams: React.Dispatch<React.SetStateAction<DogsSearchParams>>;
  next: string | null;
  prev: string | null;
  disabled: boolean;
}

const PaginationControls = ({
  setParams,
  next,
  prev,
  disabled,
}: PaginationControlsProps) => {
  const selectPrevOrNext = (cursor: string | null) => {
    if (cursor) {
      setParams((prevState) => ({ ...prevState, from: cursor }));
    }
  };

  return (
    <Pagination className='mb-6 pr-6 flex justify-end'>
      <PaginationContent>
        <PaginationItem className='mx-1'>
          <PaginationPrevious
            className={
              !prev || disabled
                ? 'opacity-50 pointer-events-none text-popover-foreground font-medium outline-1 outline-popover-foreground'
                : 'cursor-pointer text-popover-foreground font-medium outline-1 outline-popover-foreground'
            }
            isActive={!!prev}
            onClick={() => selectPrevOrNext(prev)}
          />
        </PaginationItem>
        <PaginationItem className='mx-1'>
          <PaginationNext
            className={
              !next || disabled
                ? 'opacity-50 pointer-events-none text-popover-foreground font-medium outline-1 outline-popover-foreground'
                : 'cursor-pointer text-popover-foreground font-medium outline-1 outline-popover-foreground'
            }
            isActive={!!next}
            onClick={() => selectPrevOrNext(next)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
