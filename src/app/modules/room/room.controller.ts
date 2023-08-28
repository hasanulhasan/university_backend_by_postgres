import { NextFunction, Request, Response } from "express";
import { RoomService } from "./room.service";
import sendResponse from "../../../shared/sendResponse";
import { Room } from "@prisma/client";
import httpStatus from "http-status";

const insertIntoDB =async (req:Request, res: Response, next: NextFunction) => {
  try {
    const result = await RoomService.insertIntoDB(req.body);

    sendResponse<Room>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Buildings Fetched Successfully",
      data: result
    })

  } catch (error) {
    next(error)
  }
}


export const RoomController = {
  insertIntoDB
}