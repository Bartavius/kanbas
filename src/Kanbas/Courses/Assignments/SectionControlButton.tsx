import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
export default function SectionControlButton( 
  {percent} : {percent: string}
) {
  return (
    <div className="float-end">
        <p className="rounded-3 d-inline border border-dark me-1">{percent}% of total</p>
      <BsPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
