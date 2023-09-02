import { Course } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB =async (data:Course) => {
  console.log(data)
  const result = await prisma.course.create({
    data: data
  })
  return result
}

export const CourseService = {
  insertIntoDB
}