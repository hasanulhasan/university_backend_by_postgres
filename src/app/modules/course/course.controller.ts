import { NextFunction, Request, Response } from "express";
import { CourseService } from "./course.service";
import sendResponse from "../../../shared/sendResponse";
import { Course } from "@prisma/client";
import httpStatus from "http-status";

const insertIntoDB =async (req:Request, res: Response, next: NextFunction) => {
  try {
    const result = await CourseService.insertIntoDB(req.body)
    sendResponse<Course>(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course Created Successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const getAllCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CourseService.getCourses();
    sendResponse<Course[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course fetched successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const CourseController = {
  insertIntoDB, getAllCourse
}