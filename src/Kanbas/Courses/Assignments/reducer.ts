import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  assignments: [],
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload: newAssignments}) => {
      state.assignments = newAssignments;
    },
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: assignment._id,
        title: assignment.title,
        description: assignment.description,
        points: assignment.points,
        assignment_group: assignment.group,
        submission_type: assignment.submission_type,
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
        a._id === assignment._id ? assignment : a
      ) as any;
    }
  },
});
export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;