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
export declare class PaginationDto {
    page?: number;
    limit?: number;
}
export declare class PaginationHelper {
    static createPaginationStage(page?: number, limit?: number): ({
        $skip: number;
        $limit?: undefined;
    } | {
        $limit: number;
        $skip?: undefined;
    })[];
    static createPaginationMeta(total: number, page: number, limit: number): {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
    static paginateAggregate<T>(model: any, pipeline?: any[], countPipeline?: any[], page?: number, limit?: number): Promise<PaginationResult<T>>;
}
