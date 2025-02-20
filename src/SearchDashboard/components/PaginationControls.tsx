/* UI */
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

/* Types */
import { SearchParams } from '../../hooks/types/SearchParams';

interface PaginationControlsProps {
  setParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  next: string | null;
  prev: string | null;
}

const PaginationControls = ({
  setParams,
  next,
  prev,
}: PaginationControlsProps) => {
  const selectPrevOrNext = (cursor: string | null) => {
    if (cursor) {
      setParams((prevState) => ({ ...prevState, from: cursor }));
    }
  };

  return (
    <Pagination className='mb-6 pr-6 flex justify-end'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='cursor-pointer'
            isActive={!!prev}
            onClick={() => selectPrevOrNext(prev)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className='cursor-pointer'
            isActive={!!next}
            onClick={() => selectPrevOrNext(next)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
