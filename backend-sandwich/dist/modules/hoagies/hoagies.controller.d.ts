import { HoagieService } from './hoagies.service';
import { PaginationDto } from 'src/common/helpers/pagination.helper';
import { UpdateHoagieDto } from './dto/update-hoagie.dto';
import { CreateHoagieDto } from './dto/create-hoagie.dto';
export declare class HoagiesController {
    private readonly hoagieService;
    constructor(hoagieService: HoagieService);
    create(createHoagieDto: CreateHoagieDto, req: any): Promise<import("./entities/hoagies.entity").Hoagie>;
    findAll(paginationDto: PaginationDto): Promise<import("src/common/helpers/pagination.helper").PaginationResult<import("./entities/hoagies.entity").Hoagie>>;
    findByCreator(userId: string, paginationDto: PaginationDto): Promise<import("src/common/helpers/pagination.helper").PaginationResult<import("./entities/hoagies.entity").Hoagie>>;
    findByCollaborator(req: any, paginationDto: PaginationDto): Promise<import("src/common/helpers/pagination.helper").PaginationResult<import("./entities/hoagies.entity").Hoagie>>;
    findOne(id: string): Promise<import("./entities/hoagies.entity").Hoagie>;
    update(id: string, updateHoagieDto: UpdateHoagieDto, req: any): Promise<import("./entities/hoagies.entity").Hoagie>;
    remove(id: string, req: any): Promise<void>;
    addCollaborator(id: string, collaboratorId: string, req: any): Promise<import("./entities/hoagies.entity").Hoagie>;
    removeCollaborator(id: string, collaboratorId: string, req: any): Promise<import("./entities/hoagies.entity").Hoagie>;
    getCollaboratorCount(id: string): Promise<{
        count: number;
    }>;
    checkPermission(id: string, req: any): Promise<{
        isCreator: boolean;
        isCollaborator: boolean;
    }>;
}
