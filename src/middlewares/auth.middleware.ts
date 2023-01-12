import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/appError';

export const ensureAuthMiddleware = async (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    
    let token = req.headers.authorization;

    if (!token) {
        throw new AppError(401, 'Necessário autenticação.');
    }

    token = token.split(' ')[0];

    jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (error: any, decoded: any) => {
            if (error) {
                throw new AppError(401, 'Autenticação inválida.');
            }

            req.user = {
                isAdm: decoded.isAdm,
                id: decoded.sub,
                is_seller: decoded.is_seller
            };

            next();
        }
    );
};