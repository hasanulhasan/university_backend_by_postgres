import { NextFunction, Request, Response } from "express";
import { BuildingService } from "./building.service";
import sendResponse from "../../../shared/sendResponse";
import { Building } from "@prisma/client";
import httpStatus from "http-status";

const insertIntoDB =async (req:Request, res: Response, next: NextFunction) => {
  try {
    const result = await BuildingService.insertIntoDB(req.body);
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

export const BuildingController = {
  insertIntoDB
}