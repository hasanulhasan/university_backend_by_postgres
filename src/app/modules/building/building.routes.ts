import express from 'express'
import { BuildingController } from './building.controller';

const router = express.Router();

router.post('/', BuildingController.insertIntoDB);
router.get('/', BuildingController.getAllBuildings)

export const BuildingRoutes = router