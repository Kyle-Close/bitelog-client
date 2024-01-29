import { TableCell, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FoodForm from './FoodForm';
import { FoodDataValues } from '../../FoodsPage';
import { ExpandedRow } from '../rows/Row';

interface ExpandRowCellProps {
  expandedRow: ExpandedRow;
  setExpandedRow: React.Dispatch<React.SetStateAction<ExpandedRow>>;
  food: FoodDataValues;
}

function ExpandRowCell({
  expandedRow,
  setExpandedRow,
  food,
}: ExpandRowCellProps) {
  return (
    <TableCell>
      <IconButton
        aria-label='expand row'
        size='small'
        onClick={() =>
          setExpandedRow((prevExpandedRow: ExpandedRow) => {
            return {
              component: <FoodForm food={food} />,
              isOpen: !prevExpandedRow.isOpen,
            };
          })
        }
      >
        {expandedRow.isOpen ? (
          <KeyboardArrowUpIcon />
        ) : (
          <KeyboardArrowDownIcon />
        )}
      </IconButton>
    </TableCell>
  );
}

export default ExpandRowCell;
