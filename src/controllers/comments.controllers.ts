import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import {
  getCommentsService,
  getCommentsServiceById,
  postCommentsService,
  pacthCommentsService,
  deleteCommentsServiceById,
  getVehiclesCommentsService,
} from "@services/comments.services";

export const getCommentsController = async (
  _: Request,
  res: Response
): Promise<Response> => {
  const comments = await getCommentsService();
  return res.status(200).json(instanceToPlain(comments));
};

export const getVehiclesCommentsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;

  const comments = await getVehiclesCommentsService(id);
  return res.status(200).json(instanceToPlain(comments));
};


export const getCommentsControllerByID = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;

    const users = await getCommentsServiceById({ id });

    return res.send(users);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export const postCommentsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { comment }: any = req.body;
  const { vehicleId, clientId }: any = req.params;

  const comments = await postCommentsService({ comment, clientId, vehicleId });
  return res.status(200).json(instanceToPlain(comments));
};

export const pathCommentsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { comment } = req.body;

    const id = req.params.id;

    const users = await pacthCommentsService({ comment }, id);

    return res.send({ message: "comentário Alterado", DadosUser: users });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export const deleteCommentsControllerByID = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params.id;

    const users = await deleteCommentsServiceById({ id });

    return res.send(users);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};
