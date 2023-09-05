import { Building, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBuildingFilterRequest } from "./building.interface";
import { IPaginationOptions } from "../../../interfaces/pagintaion";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { BuildingSearchableFields } from "./building.constant";
import { IGenericResponse } from "../../../interfaces/common";

const insertIntoDB = async (data:Building) => {
  const result = await prisma.building.create({
    data
  })
  return result
}

const getBuildings = async (filters:IBuildingFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Building[]>> => {
  const {page, limit, skip} = paginationHelpers.calculatePagination(options)
  const {searchTerm} = filters;
  console.log(searchTerm)
  const andConditions =[];
  if(searchTerm){
    andConditions.push({
      OR: BuildingSearchableFields.map(field=> ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    })
  }

  const whereConditions: Prisma.BuildingWhereInput = andConditions.length > 0 ? {AND: andConditions} : {};

  const result = await prisma.building.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy: options.sortBy && options.sortOrder ? 
    {
      [options.sortBy]: options.sortOrder
    }:
    {
      createdAt: 'desc'
    }
  });

  const total = await prisma.building.count();
  return {
    meta: {
      total,
      page: page,      
      limit: limit
    },
    data: result
  }
}


const deleteBuilding =async (id:string) => {
  const result = await prisma.building.delete({
    where: {
      id: id
    }
  })
  return result
}

export const BuildingService = {
  insertIntoDB, getBuildings, deleteBuilding
}