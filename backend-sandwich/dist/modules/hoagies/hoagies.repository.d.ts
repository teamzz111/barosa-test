import { Model } from 'mongoose';
import { Hoagie, HoagieDocument } from './entities/hoagies.entity';
import { CreateHoagieDto } from './dto/create-hoagie.dto';
import { PaginationResult } from 'src/common/helpers/pagination.helper';
import { BaseRepository } from 'src/common/helpers/base.repository';
export declare class HoagieRepository extends BaseRepository<HoagieDocument> {
    private readonly hoagieModel;
    constructor(hoagieModel: Model<HoagieDocument>);
    createHoagie(dto: CreateHoagieDto, creatorId: string): Promise<Hoagie>;
    getPaginatedHoagies(page?: number, limit?: number): Promise<PaginationResult<Hoagie>>;
    getHoagieWithDetails(id: string): Promise<Hoagie | null>;
    getHoagiesByCreator(creatorId: string, page?: number, limit?: number): Promise<PaginationResult<Hoagie>>;
    getHoagiesByCollaborator(userId: string, page?: number, limit?: number): Promise<PaginationResult<Hoagie>>;
    getCollaboratorCount(hoagieId: string): Promise<any>;
    removeCollaborator(hoagieId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, HoagieDocument> & Hoagie & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addCollaborator(hoagieId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, HoagieDocument> & Hoagie & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
