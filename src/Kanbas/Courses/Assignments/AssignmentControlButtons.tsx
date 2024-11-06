
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function AssignmentControlButtons(
    {assignmentId, deleteAssignment} :
    {assignmentId: string, deleteAssignment: (assignmentId: string) => void}
) {
    return (
        <div>
            <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)}/>
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    )
                                                       
}