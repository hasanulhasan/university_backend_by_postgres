// import { Course } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { ICourseCreateData } from "./course.interface";

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  const {preRequisiteCourses, ...courseData} = data;

  const newCourse = await prisma.$transaction( async (transactionClient)=> {
    const result = await transactionClient.course.create({
      data: courseData
    })

    if(!result){
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unabble to create course')
    }

    if(preRequisiteCourses && preRequisiteCourses.length > 0){
      for (let i = 0; i<preRequisiteCourses.length; i++ ){
        const createPreRequisite = await transactionClient.courseToPrerequisite.create({
          data: {
            courseId: result.id,
            preRequisiteId: preRequisiteCourses[i].courseId
          }
        })
        console.log(createPreRequisite)
      }
    }
    return result;
  })
  
  if(newCourse){
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true
          }
        },
        preRequisiteFor: {
          include: {
            course: true
          }
        }
      }
    })
    return responseData
  }
  
  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create Course')
}

const getCourses =async () => {
  const result = await prisma.course.findMany();
  return result
}

export const CourseService = {
  insertIntoDB, getCourses
}