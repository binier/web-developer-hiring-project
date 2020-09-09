import { Request, Response, NextFunction } from 'express';

export function errorHandler() {
  return (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    const sendErr = (
      status: number,
      code: string,
      message: string = code
    ) => res.status(status).send({ ok: false, code, message });

    return sendErr(500, 'internal_server_error');
  }
}
