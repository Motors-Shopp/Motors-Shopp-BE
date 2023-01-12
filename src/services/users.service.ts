import User from "@entities/users.entity";
import { AppError } from "@errors/appError";
import { IAddress } from "@interfaces/address.interface";
import { IUserRequest, IUserUpdate } from "@interfaces/user.interface";
import { generateJWTToken } from "@utils/generateJWTToken";
import bcrypt from "bcryptjs";
import AppDataSource from "../data-source";
import { createAddressService, updateAddressService } from "./address.service";

export const createUserService = async ({
  name,
  email,
  cpf,
  cellphone,
  birthdate,
  bio,
  is_seller,
  is_client,
  user_picture,
  password,
  address: { street, number, complement, district, state },
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);
  const cpfAlreadyExists = users.find((user) => user.cpf === cpf);
  const cellphoneAlreadyExists = users.find(
    (user) => user.cellphone === cellphone
  );

  if (emailAlreadyExists) {
    throw new Error("email already exists");
  }

  if (cpfAlreadyExists) {
    throw new Error("cpf already exists");
  }

  if (cellphoneAlreadyExists) {
    throw new Error("este telefone já possui uma conta cadastrada");
  }

  if (is_seller === true && is_client === true) {
    throw new Error("Um cliente não pode ser vendedor e vice versa");
  }

  if (is_seller === false && is_client === false) {
    throw new Error("Você precisa ser um cliente ou um vendedor");
  }

  const createAdress: IAddress = await createAddressService({
    street,
    number,
    complement,
    district,
    state,
  });

  const hashPassword = bcrypt.hashSync(password, 10);

  password = hashPassword;

  const newUser = userRepository.create({
    name,
    email,
    cpf,
    cellphone,
    birthdate,
    bio,
    is_seller,
    is_client,
    password,
    user_picture,
  });

  newUser.address = createAdress;

  await userRepository.save(newUser);

  return newUser;
};

export const updateUserService = async ({
  id,
  name,
  email,
  cpf,
  cellphone,
  birthdate,
  bio,
  password,
  user_picture,
  address: { street, number, complement, district, state },
}: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  if (!id) {
    throw new Error("account not found no id");
  }

  const account = users.find((user) => user.id === id);

  if (!account) {
    throw new Error("account not found na account");
  }

  name !== undefined ? (account!.name = name) : account!.name;
  email !== undefined ? (account!.email = email) : account!.email;
  cpf !== undefined ? (account!.cpf = cpf) : account!.cpf;
  cellphone !== undefined
    ? (account!.cellphone = cellphone)
    : account!.cellphone;
  birthdate !== undefined
    ? (account!.birthdate = birthdate)
    : account!.birthdate;
  bio !== undefined ? (account!.bio = bio) : account!.bio;
  password !== undefined
    ? (account!.password = bcrypt.hashSync(password, 10))
    : account!.password;

  await userRepository.update(account!.id, {
    name: name,
    email: email,
    cpf: cpf,
    cellphone: cellphone,
    birthdate: birthdate,
    bio: bio,
    is_seller: account!.is_seller,
    is_client: account!.is_client,
    is_active: account!.is_active,
    password: password,
  });

  updateAddressService({
    id,
    street,
    number,
    complement,
    district,
    state,
  });

  return true;
};

export const findOneUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  if (!id) {
    throw new Error("account not found no id");
  }

  const account = users.find((user) => user.id === id);

  if (!account) {
    throw new Error("account not found na account");
  }

  return account;
};

export const userListService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = userRepository.find();

  return users;
};

export const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id,
    },
  });

  if (user) {
    if (user.is_active) {
      user.is_active = false;
    } else {
      throw new Error("Inactive user");
    }
  } else {
    throw new Error("User not found");
  }

  await userRepository.save(user);
};
