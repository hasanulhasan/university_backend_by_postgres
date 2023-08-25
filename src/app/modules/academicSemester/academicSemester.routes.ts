import express from 'express'
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemesterValidation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/:id', AcademicSemesterController.getSingleSemester)
router.delete('/:id', AcademicSemesterController.deleteSemester)
router.patch('/:id',validateRequest(AcademicSemesterValidation.update), AcademicSemesterController.updateSemester)
router.get('/', AcademicSemesterController.getAllSemesters)
router.post('/',validateRequest(AcademicSemesterValidation.create), AcademicSemesterController.insertIntoDB);

export const AcademicSemesterRoutes = router;