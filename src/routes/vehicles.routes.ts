import { getCarVehicleController,getMotorBikeVehicleController, createVehicleController, deleteVehicleController, getVehicleByIDController, getVehicleController, updateVehicleController } from '@controllers/vehicle.controllers';
import { ensureAuthMiddleware } from '@middlewares/auth.middleware';
import { ensureSeller } from '@middlewares/isSeller.middleware';
import { Router } from 'express';

export const vehiclesRouter = Router();

vehiclesRouter.get("", getVehicleController) 
vehiclesRouter.get("/motorbike", getMotorBikeVehicleController) 
vehiclesRouter.get("/car", getCarVehicleController) 
vehiclesRouter.get("/:id", getVehicleByIDController)
vehiclesRouter.post("", ensureAuthMiddleware, createVehicleController);
vehiclesRouter.delete("/:id", ensureAuthMiddleware, ensureSeller, deleteVehicleController);
vehiclesRouter.patch("/:id", ensureAuthMiddleware, ensureSeller, updateVehicleController);
