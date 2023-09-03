import { Room } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (data:Room): Promise<Room> => {
  const result = await prisma.room.create({
    data,
    include: {
      building: true
    }
  })
  return result
}

const getRooms = async (): Promise<Room[]> => {
  const result = await prisma.room.findMany();
  return result
}

const deleteRoomFromDB = async (id: string): Promise<Room> => {
  const result = await prisma.room.delete({
    where: {
      id: id
    }
  });
  return result
}

export const RoomService = { 
  insertIntoDB, getRooms, deleteRoomFromDB
}