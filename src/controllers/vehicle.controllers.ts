import {Request, Response} from 'express';
import { instanceToPlain } from "class-transformer";
import { getCarVehiclesService,getMotorBikeVehiclesService,createVehicleService, deleteVehicleService, getVehicleByIdService, getVehiclesService, updateVehicleService } from '@services/vehicle.services';
import { ICreateVehicle, IUpdateVehicle } from '@interfaces/vehicles.interface';


export const createVehicleController = async (req: Request, res: Response): Promise<Response> =>{
  const data = req.body;
  const { id } = req.user;

  const newVehicle = await createVehicleService(id, data);

  return res.status(201).json({ message: 'Anúncio criado com sucesso.'}); 
}

export const getVehicleController = async(_: Request, res: Response): Promise<Response> =>{
  const vehicle = await getVehiclesService();
  return res.status(200).json(instanceToPlain(vehicle));
}

export const getMotorBikeVehicleController = async(_: Request, res: Response): Promise<Response> =>{
  const vehicle = await getMotorBikeVehiclesService();
  return res.status(200).json(instanceToPlain(vehicle));
}

export const getCarVehicleController = async(_: Request, res: Response): Promise<Response> =>{
  const vehicle = await getCarVehiclesService();
  return res.status(200).json(instanceToPlain(vehicle));
}

export const getVehicleByIDController = async (req: Request, res: Response): Promise<Response> =>{
  const { id } = req.params;
  const vehicle = await getVehicleByIdService({ id });
  return res.status(200).json(instanceToPlain(vehicle));
}

export const updateVehicleController = async (req: Request, res: Response): Promise<Response> =>{
  const { id } = req.params;
  const {title, description, year, kilometers, price, typeOfVehicle, img, fristImg}: IUpdateVehicle = req.body;
  await updateVehicleService(id, {title, description, year, kilometers, price, typeOfVehicle, img, fristImg});
  return res.status(200).json({ message: 'Anúncio atualizado com sucesso.'});
}


export const deleteVehicleController = async (req: Request, res: Response): Promise<Response> =>{
  const { id } = req.params;
  await deleteVehicleService({ id });
  return res.status(200).json({ message: 'Anúncio removido com sucesso.'});
}
