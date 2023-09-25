import { IPaginationProps } from "../../types/interfaces";
import { ChevronDownIcon } from "../icons/ChevronDownIcon/ChevronDownIcon";
import { ChevronLeftIcon } from "../icons/ChevronLeftIcon/ChevronLeftIcon";
import { ChevronRightIcon } from "../icons/ChevronRightIcon/ChevronRightIcon";
import { ChevronUpIcon } from "../icons/ChevronUpIcon/ChevronUpIcon";


const Pagination = (props: IPaginationProps) => {
  const {
    direction,
    onSwitchPage
  } = props;

  return (
    <div className="pagination__wrapper">
      <button className="btn-pagination--mobile" onClick={() => onSwitchPage(direction)}>
        {
          direction === '<'
            ? (
              <ChevronUpIcon fill="#2b5329" width="30px" height="30px" />
            )
            : (
              <ChevronDownIcon />
            )
        }
      </button>
      <button className="btn-pagination--desktop" onClick={() => onSwitchPage(direction)}>
        {
          direction === '<'
            ? (
              <ChevronLeftIcon />
            )
            : (
              <ChevronRightIcon />
            )
        }
        <div className="previous">{direction === '<' ? 'previous' : 'next'}</div>
      </button>
    </div>
  )
}

export default Pagination;