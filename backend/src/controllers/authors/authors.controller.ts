import { Application, Request, Response } from 'express';

import { ResponseBuilder } from '@utils/ResponseBuilder';
import BaseApi from '@utils/BaseApi';
import { BodyValidator } from '@utils/BodyValidator';
import { CreateAuthorDTO } from '@controllers/authors/authors.dto';
import { AuthorsService } from '@services/authors/authors.service';
import { queryParamsWithPageDetails } from '@utils/paginationBuilder';

export class AuthorsController extends BaseApi {
  constructor(app: Application) {
    super();
    this.register(app);
  }

  public register(app: Application): void {
    app.use('/api/v1/authors', this.router);
    this.router.post('/', CreateAuthorDTO(), this.create);
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
    this.router.put('/:id', CreateAuthorDTO(), this.update);
  }

  public async getAll(_req: Request, _res: Response) {
    const { data, meta } = await AuthorsService.getAll(queryParamsWithPageDetails(_req));
    return ResponseBuilder.successResponseWithPagination(_res, data, meta);
  }

  public async getOne(_req: Request, _res: Response) {
    const data = await AuthorsService.getOne(_req.params.id);
    return ResponseBuilder.successResponse(_res, data);
  }

  @BodyValidator()
  public async create(_req: Request, _res: Response) {
    const data = await AuthorsService.create(_req.body);
    return ResponseBuilder.successResponse(_res, data, 201);
  }

  @BodyValidator()
  public async update(_req: Request, _res: Response) {
    const data = await AuthorsService.update(_req.params.id, _req.body);
    return ResponseBuilder.successResponse(_res, data);
  }
}
