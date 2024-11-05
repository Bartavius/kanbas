import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
export default function SectionControlButton( 
  {percent} : {percent: string}
) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div className="float-end">
        <p className="rounded-3 d-inline border border-dark me-1">{percent}% of total</p>
      {currentUser.role === "FACULTY" ? <div>
      <BsPlus />
      <IoEllipsisVertical className="fs-4" /></div> : <div></div>}
    </div>
);}
