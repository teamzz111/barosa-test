import { PaginationResult } from 'src/common/helpers/pagination.helper';
import { CreateHoagieDto } from './dto/create-hoagie.dto';
import { UpdateHoagieDto } from './dto/update-hoagie.dto';
import { Hoagie } from './entities/hoagies.entity';
import { HoagieRepository } from './hoagies.repository';
export declare class HoagieService {
    private readonly hoagieRepository;
    constructor(hoagieRepository: HoagieRepository);
    create(createHoagieDto: CreateHoagieDto, userId: string): Promise<Hoagie>;
    findAll(page?: number, limit?: number): Promise<PaginationResult<Hoagie>>;
    findOne(id: string): Promise<Hoagie>;
    update(id: string, updateHoagieDto: UpdateHoagieDto, userId: string): Promise<Hoagie>;
    remove(id: string, userId: string): Promise<void>;
    addCollaborator(hoagieId: string, collaboratorId: string, userId: string): Promise<Hoagie>;
    removeCollaborator(hoagieId: string, collaboratorId: string, userId: string): Promise<Hoagie>;
    getCollaboratorCount(hoagieId: string): Promise<number>;
    findByCreator(creatorId: string, page?: number, limit?: number): Promise<PaginationResult<Hoagie>>;
    findByCollaborator(userId: string, page?: number, limit?: number): Promise<PaginationResult<Hoagie>>;
    search(query: string, page?: number, limit?: number): Promise<PaginationResult<Hoagie>>;
    checkPermission(hoagieId: string, userId: string): Promise<{
        isCreator: boolean;
        isCollaborator: boolean;
    }>;
}
