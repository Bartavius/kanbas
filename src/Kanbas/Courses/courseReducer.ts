import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";

const initialState = {
    courses: courses,
  };

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addCourse: (state, { payload: course }) => {
            const newCourse: any = {
                    _id: new Date().getDate().toString(), name: course.name, number: "New Number",
                    startDate: "2023-09-10", endDate: "2023-12-15", description: course.description,
                  }
            state.courses = [...state.courses, newCourse] as any;
        },
        deleteCourse: (state, { payload: courseId}) => {
            state.courses.filter((course) => course._id !== courseId)
        },
        updateCourse: (state, {payload: course}) => {
            state.courses.map((c) => {
                if (c._id === course._id) {
                  return course;
                } else {
                  return c;
                }
            })
        }
    }
})
  
export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;