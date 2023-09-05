import { NextFunction, Request, Response } from "express";
import { BuildingService } from "./building.service";
import sendResponse from "../../../shared/sendResponse";
import { Building } from "@prisma/client";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { BuildingFilterableFields } from "./building.constant";

const insertIntoDB = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const result = await BuildingService.insertIntoDB(req.body)
     sendResponse<Building>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Building Created Successfully",
      data: result
    })
  } catch (error) {
      next(error)
  }
}

const getAllBuildings =async (req:Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, BuildingFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await BuildingService.getBuildings(filters, options)
     sendResponse<Building[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Buildings Fetched Successfully",
      meta: result.meta,
      data: result.data
    })
  } catch (error) {
    next(error)
  }
}

const deleteFromDB = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const result = await BuildingService.deleteBuilding(req.params.id)
     sendResponse<Building>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Building Deleted Successfully",
      data: result
    })
  } catch (error) {
      next(error)
  }
}

export const BuildingController = {
  insertIntoDB, getAllBuildings, deleteFromDB
}