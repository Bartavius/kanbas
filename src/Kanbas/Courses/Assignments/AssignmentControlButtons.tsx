
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function AssignmentControlButtons( {assignmentID} : {assignmentID: string}
) {
    return (
        <div>
            <FaTrash className="text-danger me-2 mb-1" data-bs-toggle="modal" data-bs-target={`#wd-delete-assignment-dialog-${assignmentID}`} onClick={(e) => e.preventDefault()}/>
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    )
                                                       
}