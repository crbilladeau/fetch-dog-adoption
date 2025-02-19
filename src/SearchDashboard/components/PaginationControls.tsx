/* UI */
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationControlsProps {
  setCursor: (cursor: string | null) => void;
  next: string | null;
  prev: string | null;
}

const PaginationControls = ({
  setCursor,
  next,
  prev,
}: PaginationControlsProps) => {
  const handlePageClick = (cursor: string | null) => {
    if (cursor) {
      setCursor(cursor);
    }
  };

  return (
    <Pagination className='mb-6 pr-6 flex justify-end'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='cursor-pointer'
            isActive={!!prev}
            onClick={() => handlePageClick(prev)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className='cursor-pointer'
            isActive={!!next}
            onClick={() => handlePageClick(next)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
