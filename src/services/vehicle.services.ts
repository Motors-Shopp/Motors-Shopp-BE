import User from "@entities/users.entity";
import Vehicle from "@entities/vehicles.entity";
import { AppError } from "@errors/appError";
import {
  ICreateVehicle,
  IGetCarsById,
  IUpdateVehicle,
} from "@interfaces/vehicles.interface";
import AppDataSource from "../data-source";

export const createVehicleService = async (
  userID: string,
  data: ICreateVehicle
): Promise<Vehicle> => {
  const vehiclesRepository = AppDataSource.getRepository(Vehicle);
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userID });

  if (!user) {
    throw new Error("user not found");
  }

  console.log(user);

  const {
    title,
    year,
    kilometers,
    price,
    description,
    typeOfVehicle,
    img,
    fristImg,
  } = data;

  const newVehicle = new Vehicle();
  newVehicle.title = title;
  newVehicle.year = year;
  newVehicle.kilometers = kilometers;
  newVehicle.price = price;
  newVehicle.description = description;
  newVehicle.typeOfVehicle = typeOfVehicle;
  newVehicle.img = img;
  newVehicle.fristImg = fristImg;
  newVehicle.seller = user;

  vehiclesRepository.create(newVehicle);
  // user!.vehicles.push(newVehicle);
  await vehiclesRepository.save(newVehicle);

  return newVehicle;
};

export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const vehicles = await vehicleRepository.find();
  return vehicles
};

export const getMotorBikeVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const vehicles:any = await vehicleRepository.find();
  let arrVeicles = []
  for (let i = 0; i < vehicles.length; i++) {
    if(vehicles[i].typeOfVehicle === "motorbike"){
      arrVeicles.push(vehicles[i])
    }
  }
  return arrVeicles
};

export const getCarVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const vehicles:any = await vehicleRepository.find();
  let arrVeicles = []
  for (let i = 0; i < vehicles.length; i++) {
    if(vehicles[i].typeOfVehicle === "car"){
      arrVeicles.push(vehicles[i])
    }
  }
  return arrVeicles
};

export const getVehicleByIdService = async ({
  id,
}: IGetCarsById): Promise<Vehicle> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const vehicle = await vehicleRepository.findOneBy({ id: id });

  if (!vehicle) throw new AppError(404, "Vehicle not found.");

  return vehicle;
};

export const updateVehicleService = async (
  id: string,
  {
    title,
    description,
    year,
    kilometers,
    price,
    typeOfVehicle,
    img,
    fristImg,
  }: IUpdateVehicle
): Promise<void> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const vehicle = await vehicleRepository.findOneBy({ id: id });

  if (!vehicle) throw new AppError(404, "Vehicle not found.");

  vehicle.title = title || vehicle.title;
  vehicle.description = description || vehicle.description;
  vehicle.description = year || vehicle.year;
  vehicle.kilometers = kilometers || vehicle.kilometers;
  vehicle.price = price || vehicle.price;
  vehicle.typeOfVehicle = typeOfVehicle || vehicle.typeOfVehicle;
  vehicle.img = img || vehicle.img;
  vehicle.fristImg = fristImg || vehicle.fristImg;

  await vehicleRepository.update(id, vehicle);
};

export const deleteVehicleService = async ({
  id,
}: IGetCarsById): Promise<void> => {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const vehicle = await vehicleRepository.findOneBy({ id: id });

  if (!vehicle) throw new AppError(404, "Vehicle not found.");

  // vehicle.active = false;
};
