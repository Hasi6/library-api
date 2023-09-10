import { Application, Request, Response } from 'express';

import { ResponseBuilder } from '@utils/ResponseBuilder';
import BaseApi from '@utils/BaseApi';
import { BodyValidator } from '@utils/BodyValidator';
import { CreateBookDTO } from '@controllers/books/books.dto';
import { BooksService } from '@services/books/books.service';
import { queryParamsWithPageDetails } from '@utils/paginationBuilder';

export class BooksController extends BaseApi {
  constructor(app: Application) {
    super();
    this.register(app);
  }

  public register(app: Application): void {
    app.use('/api/v1/books', this.router);
    this.router.post('/', CreateBookDTO(), this.create);
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
    this.router.put('/:id', CreateBookDTO(), this.update);
  }

  public async getAll(_req: Request, _res: Response) {
    const { data, meta } = await BooksService.getAll(queryParamsWithPageDetails(_req));
    return ResponseBuilder.successResponseWithPagination(_res, data, meta);
  }

  public async getOne(_req: Request, _res: Response) {
    const data = await BooksService.getOne(_req.params.id);
    return ResponseBuilder.successResponse(_res, data);
  }

  @BodyValidator()
  public async create(_req: Request, _res: Response) {
    const data = await BooksService.create(_req.body);
    return ResponseBuilder.successResponse(_res, data, 201);
  }

  @BodyValidator()
  public async update(_req: Request, _res: Response) {
    const data = await BooksService.update(_req.params.id, _req.body);
    return ResponseBuilder.successResponse(_res, data);
  }
}
