import {
  deleteCommentsControllerByID,
  getCommentsController,
  getCommentsControllerByID,
  postCommentsController,
  pathCommentsController,
  getVehiclesCommentsController,
} from "@controllers/comments.controllers";
import { Router } from "express";

export const commentsRouter = Router();

commentsRouter.get("", getCommentsController);
commentsRouter.get("/vehicles/:id", getVehiclesCommentsController);
commentsRouter.get("/list/:id", getCommentsControllerByID);
commentsRouter.post("/:vehicleId/:clientId", postCommentsController);
commentsRouter.patch("/update/:id", pathCommentsController);
commentsRouter.delete("/delete/:id", deleteCommentsControllerByID);
