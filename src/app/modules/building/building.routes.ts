import express from 'express'
import { BuildingController } from './building.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingValidations } from './building.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN) ,validateRequest(BuildingValidations.create), BuildingController.insertIntoDB);
router.get('/', BuildingController.getAllBuildings)
router.delete('/:id', BuildingController.deleteFromDB)

export const BuildingRoutes = router