import { Document, Model } from 'mongoose';
export interface PaginationParams {
    page?: number;
    limit?: number;
}
export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    pages: number;
}
export interface PaginationResult<T> {
    data: T[];
    meta: PaginationMeta;
}
export declare class PaginationDto {
    page?: number;
    limit?: number;
}
export declare class PaginationHelper {
    static createPaginationStage(page?: number, limit?: number): any[];
    static createPaginationMeta(total: number, page: number, limit: number): PaginationMeta;
    static paginateAggregate<T, D extends Document>(model: Model<D>, pipeline?: any[], countPipeline?: any[], page?: number, limit?: number): Promise<PaginationResult<T>>;
}
