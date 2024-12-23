"use client";
import SectionWrapper from "@/components/common/SectionWrapper";
import { UserRoundPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import TeacherForm from "./TeacherDetail";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import DeleteTeacher from "./DeleteTeacher";
import { getTeachers } from "@/services/teacher/user";
import axiosInstance from "@/lib/axiosInstance";

interface Teacher {
  email: string;
  teacherName: string;
  address: string;
  contactNumber: string;
  department: string;
  id: string;
}

interface TeacherResponse {
  teachers: Teacher[];
}

const Teacher = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axiosInstance.get<TeacherResponse>("/teacher");

        const teacherData: Teacher[] = response.data.teachers
          ? response.data.teachers.map((teacher: Teacher) => ({
              id: teacher.id.toString(),
              email: teacher.email,
              teacherName: teacher.teacherName,
              address: teacher.address,
              contactNumber: teacher.contactNumber,
              department: teacher.department,
            }))
          : [];

        setTeachers(teacherData);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <SectionWrapper>
      <div className="flex items-center justify-between py-4">
        <Typography weight="bold" className="text-white">
          Teachers
        </Typography>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-gray-900 font-bold whitespace-nowrap dark:text-white"
                  >
                    {teacher.teacherName}
                  </th>
                  <td className="px-6 py-4">{teacher.department}</td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/teacher/update/${teacher.id}`}
                      className="p-2 w-fit rounded-full flex justify-center items-center text-sm font-medium text-white bg-gray-500 hover:bg-gray-600"
                    >
                      <UserRoundPen size={15} />
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DeleteTeacher teacherId={teacher.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Teacher Cannot be Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};

export default Teacher;
