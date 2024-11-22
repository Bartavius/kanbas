import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  enrollments: [],
};
const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollment: (state, {payload: newEnrollment}) => {
      state.enrollments = newEnrollment;
    },
    enroll: (state, { payload: { userId, courseId } }) => {
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        user: userId,
        course: courseId
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenroll: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter(
        (m: any) => m._id !== enrollmentId);
    }
  },
});
export const { setEnrollment, enroll, unenroll } =
  enrollmentSlice.actions;
export default enrollmentSlice.reducer;