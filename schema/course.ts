import { z } from 'zod';

export const courseSchema = z.object({
  courses: z.array(
    z.object({
      classId:z.string(),
      teacherName:z.string().nonempty("Teacher is required"),
      teacherId:z.string(),
      courseName: z.string().nonempty({ message: "Course name is required" }),
      startTime: z.string().nonempty({ message: "Start time is required" }),
      days: z
        .array(z.string().nonempty({ message: "Day is required" }))
        .min(1, { message: "At least one day must be selected" }),
      className: z.string().nonempty({ message: "Class name is required" }),
    })
  ).min(1, { message: "At least one course must be added" }),
});