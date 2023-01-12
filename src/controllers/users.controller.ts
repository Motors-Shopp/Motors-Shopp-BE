import { IUser } from "@interfaces/user.interface";
import {
  createUserService,
  deleteUserService,
  findOneUserService,
  updateUserService,
  userListService,
} from "@services/users.service";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const {
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
      address: { street, number, complement, district, state },
    } = req.body;

    const newUser: IUser = await createUserService({
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
      address: { street, number, complement, district, state },
    });

    return res.status(201).json(instanceToPlain(newUser));
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      cpf,
      cellphone,
      birthdate,
      bio,
      password,
      user_picture,
      address: { street, number, complement, district, state },
    } = req.body;

    const user: any = await updateUserService({
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
    });

    return res.status(200).json("user updated with sucess");
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export const findOneUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await findOneUserService(id);

    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export const userListcontroller = async (req: Request, res: Response) => {
  try {
    const users = await userListService();

    return res.send(users);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteUserService(id);

    return res.status(204).send();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

