import { IAddress, IAddressRequest, IAddressUpdate } from "./address.interface";

export interface IUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  cellphone: string;
  birthdate: string;
  bio: string;
  is_seller: boolean;
  is_client: boolean;
  is_active?: boolean;
  password: string;
  address: IAddress;
  user_picture: string,
  vehicles?: Array<object>;
}

export interface IUserRequest {
  name: string;
  email: string;
  cpf: string;
  user_picture: string,
  cellphone: string;
  birthdate: string;
  bio: string;
  is_seller: boolean;
  is_client: boolean;
  is_active?: boolean;
  password: string;
  address: IAddressRequest;
}

export interface IUserUpdate {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  cellphone?: string;
  birthdate?: string;
  bio?: string;
  password?: string;
  user_picture: string,
  address: IAddressUpdate;
  vehicles?: Array<object>;
}

export interface IUserUpdateResponse {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  cellphone?: string;
  birthdate?: string;
  bio?: string;
  is_seller?: boolean;
  is_client?: boolean;
  is_active?: boolean;
  password?: string;
  address?: IAddressUpdate;
  vehicles?: Array<object>;
}

export interface IUserLogin {
  email: string;
  password: string;
}

