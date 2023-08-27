import express from 'express'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { BuildingRoutes } from '../modules/building/building.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes
  },
  {
    path: '/building',
    route: BuildingRoutes
  }
];

moduleRoutes.forEach(route=> router.use(route.path, route.route));
export default router;