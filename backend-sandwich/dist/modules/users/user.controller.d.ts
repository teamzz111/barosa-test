import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/helpers/pagination.helper';
import { UpdateUserDto } from './dto/update-user-dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./entities/user.entity").UserDocument> & import("./entities/user.entity").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    search(query: string, paginationDto: PaginationDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./entities/user.entity").UserDocument> & import("./entities/user.entity").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
