import { NextFunction, Request, Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import sendResponse from "../../../shared/sendResponse";
import {AcademicSemester} from "@prisma/client";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const insertIntoDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicSemesterService.insertIntoDB(req.body);
    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester Created",
      data: result
    })

  } catch (error) {
    next(error)
  }
}

const getAllSemesters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, ['searchTerm', 'code', 'year', 'title', 'startMonth', 'endMonth'])
    const options = pick(req.query, ['limit', 'page', 'sort', 'sortOrder'])
    
    console.log('filters' , filters)
    console.log('options', options)

    const result = await AcademicSemesterService.getAllFromDB(filters,options);
    sendResponse<AcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester Created",
      meta: result.meta,
      data: result.data
    })

  } catch (error) {
    next(error)
  }
}


export const AcademicSemesterController = {
  insertIntoDB,getAllSemesters
}