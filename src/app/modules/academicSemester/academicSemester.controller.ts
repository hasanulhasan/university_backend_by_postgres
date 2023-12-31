import { NextFunction, Request, Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import sendResponse from "../../../shared/sendResponse";
import {AcademicSemester} from "@prisma/client";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { AcademicFilterableFields } from "./academicSemester.constants";

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
    const filters = pick(req.query, AcademicFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await AcademicSemesterService.getAllFromDB(filters,options);

    sendResponse<AcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semesters fetched Successfully",
      meta: result.meta,
      data: result.data
    })

  } catch (error) {
    next(error)
  }
}

const getSingleSemester = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicSemesterService.getDataById(req.params.id);

    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Academic Semester Fetched",
      data: result
    })

  } catch (error) {
    next(error)
  }
}

const updateSemester = async (req: Request, res: Response, next: NextFunction)=> {
  try {
    const id = req.params.id;
    const payload = req.body;
    const result = await AcademicSemesterService.updateIntoDB(id,payload)

    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester Updated successfully",
      data: result
    })

  } catch (error) {
    next(error)
  }
}

const deleteSemester =async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await AcademicSemesterService.deleteFromDB(id)

    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester Deleted successfully",
      data: result
    })

  } catch (error) {
    next(error)
  }
}


export const AcademicSemesterController = {
  insertIntoDB, getAllSemesters, getSingleSemester, updateSemester, deleteSemester
}