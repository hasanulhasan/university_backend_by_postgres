import { PrismaClient, AcademicSemester} from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async (academicSemesterData: AcademicSemester) => {
  const result = await prisma.academicSemester.create({
    data: academicSemesterData
  })
  return result
}

export const AcademicSemesterService = {
  insertIntoDB
}