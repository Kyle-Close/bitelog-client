import { TableCell, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface ExpandRowCellProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function ExpandRowCell({ open, setOpen }: ExpandRowCellProps) {
  return (
    <TableCell>
      <IconButton
        aria-label='expand row'
        size='small'
        onClick={() => setOpen(!open)}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </TableCell>
  );
}

export default ExpandRowCell;
