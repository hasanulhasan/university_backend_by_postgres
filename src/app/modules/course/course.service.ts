import { Course } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (data: Course): Promise<Course> => {
  const result = await prisma.course.create({
    data
  })
  return result
}

const getCourses =async () => {
  const result = await prisma.course.findMany();
  return result
}

export const CourseService = {
  insertIntoDB, getCourses
}