import User from "@entities/users.entity";

export interface ICreateVehicle {
  title: string;
  description: string;
  year: string;
  kilometers: string;
  price: string;
  typeOfVehicle: string;
  img: string;
  fristImg: string;
  seller?: User;
}

export interface IUpdateVehicle {
  title: string;
  description: string;
  year: string;
  kilometers: string;
  price: string;
  typeOfVehicle: string;
  img: string;
  fristImg: string;
}

export interface IGetCarsById {
  id: string;
}
