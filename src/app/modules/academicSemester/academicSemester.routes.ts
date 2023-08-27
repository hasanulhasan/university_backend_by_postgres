import express from 'express'
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemesterValidation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/:id', AcademicSemesterController.getSingleSemester)
router.delete('/:id', AcademicSemesterController.deleteSemester)
router.patch('/:id',validateRequest(AcademicSemesterValidation.update), AcademicSemesterController.updateSemester)
router.get('/', AcademicSemesterController.getAllSemesters)
router.post('/',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),validateRequest(AcademicSemesterValidation.create), AcademicSemesterController.insertIntoDB);

export const AcademicSemesterRoutes = router;