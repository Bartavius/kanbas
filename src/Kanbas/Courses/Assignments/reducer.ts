import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
  assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {

        {/* {
      "course": "CS101",
      "assignment_group": "extra credit",
      "percentage": "20",
      "assignments": [
        {
          "_id": "A103",
          "title": "HTML/CSS Extra Credit",
          "description": "Extra credit for mastering HTML/CSS techniques.",
          "points": "50",
          "assignment_group": "extra credit",
          "submission_type": "online",
          "display_grade_as": "percentage",
          "assign_to": "everyone",
          "due_date": "May 12 at 12:00am",
          "available_from": "May 7 at 12:00am",
          "available_until": "May 12 at 12:00am",
          "course": "CS101"
        }
      ]
    }, */}
      const newAssignment: any = {
        _id: new Date().getTime().toString(),
        title: assignment.name,
        description: assignment.description,
        points: assignment.points,
        assignment_group: assignment.group,
        submissionType: assignment.submissionType,
        display_grade_as: assignment.display_grade_as,
        assign_to: assignment.assign_to,
        due_date: assignment.due_date,
        available_from: assignment.available_from,
        available_until: assignment.available_until,
        course: assignment.course,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === a._id ? assignment : a
      ) as any;
    }
  },
});
export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;