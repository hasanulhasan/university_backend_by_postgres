import { PrismaClient, AcademicSemester, Prisma} from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagintaion";
import { IAcademicSemesterFilterRequest } from "./academicSemester.interfaces";
import { AcademicSemesterSearchAbleFields } from "./academicSemester.constants";

const prisma = new PrismaClient();

const insertIntoDB = async (academicSemesterData: AcademicSemester) => {
  const result = await prisma.academicSemester.create({
    data: academicSemesterData
  })
  return result
}

const getAllFromDB = async (filters:IAcademicSemesterFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<AcademicSemester[]>> => {
  const {page, limit, skip} = paginationHelpers.calculatePagination(options)
  const {searchTerm, ...filterData} = filters;
  const andConditions =[];

  if(searchTerm){
    andConditions.push({
      OR: AcademicSemesterSearchAbleFields.map(field=> ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    })
  }
  
  if(Object.keys(filterData).length>0){
    andConditions.push({
      AND: Object.keys(filterData).map(key=> ({
        [key]: {
          equals: (filterData as any) [key]
        }
      }))
    })
  }

  const whereConditions: Prisma.AcademicSemesterWhereInput = andConditions.length > 0 ? {AND: andConditions} : {};

  // console.log(page, limit,skip)
  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit
  });

  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page: page,
      limit: limit,
    },
    data: result
  };
}

export const AcademicSemesterService = {
  insertIntoDB,getAllFromDB
}