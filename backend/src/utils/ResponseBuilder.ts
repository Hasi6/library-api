import { Response } from 'express';

export class ResponseBuilder {
  public static successResponse(res: Response, data: object, status = 200) {
    return res.status(status).json({
      errors: null,
      success: true,
      data
    });
  }

  public static successResponseWithPagination(
    res: Response,
    data: object,
    meta: object,
    status = 200
  ) {
    return res.status(status).json({
      errors: null,
      success: true,
      data,
      meta
    });
  }
}
