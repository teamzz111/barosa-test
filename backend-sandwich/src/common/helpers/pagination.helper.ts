import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}

export class PaginationHelper {
  static createPaginationStage(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return [{ $skip: skip }, { $limit: limit }];
  }

  static createPaginationMeta(total: number, page: number, limit: number) {
    return {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  static async paginateAggregate<T>(
    model: any,
    pipeline: any[] = [],
    countPipeline: any[] = [],
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginationResult<T>> {
    const countResult = await model.aggregate([
      ...countPipeline,
      { $count: 'total' },
    ]);

    const total = countResult.length > 0 ? countResult[0].total : 0;

    const paginationStage = this.createPaginationStage(page, limit);
    const data = await model.aggregate([...pipeline, ...paginationStage]);

    return {
      data,
      meta: this.createPaginationMeta(total, page, limit),
    };
  }
}
