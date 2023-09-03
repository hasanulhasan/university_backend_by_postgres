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

const getAllRoom =async (req:Request, res: Response, next: NextFunction) => {
  try {
    const result = await RoomService.getRooms();
    sendResponse<Room[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Rooms Fetched Successfully",
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const deleteRoom =async (req:Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await RoomService.deleteRoomFromDB(id);
    sendResponse<Room>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Room Deleted Successfully",
      data: result
    })
  } catch (error) {
    next(error)
  }
}


export const RoomController = {
  insertIntoDB, getAllRoom, deleteRoom
}