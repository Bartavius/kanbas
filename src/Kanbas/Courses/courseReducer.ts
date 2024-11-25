import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses: [] as any,
  };

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses: (state, {payload: courses}) => {
            state.courses = courses;
        },
        addCourse: (state, { payload: course }) => {
            // const newCourse: any = {
            //         _id: course._id, name: course.name, number: "New Number",
            //         startDate: "2023-09-10", endDate: "2023-12-15", description: course.description,
            //       }
            state.courses = [...state.courses, course] as any;
        },
        deleteCourse: (state, { payload: courseId}) => {
            state.courses = state.courses.filter((course: any) => course._id !== courseId)
        },
        updateCourse: (state, {payload: course}) => {
            state.courses = state.courses.map((c: any) => {
                if (c._id === course._id) {
                  return course;
                } else {
                  return c;
                }
            })
        }
    }
})
  
export const { setCourses, addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;