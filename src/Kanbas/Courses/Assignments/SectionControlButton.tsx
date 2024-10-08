import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
export default function SectionControlButton() {
  return (
    <div className="float-end">
        <p className="rounded-3 d-inline border border-dark me-1">40% of total</p>
      <BsPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
