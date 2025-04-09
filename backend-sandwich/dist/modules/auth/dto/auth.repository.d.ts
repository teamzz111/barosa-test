import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/helpers/base.repository';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user-dto';
import { User, UserDocument } from 'src/modules/users/entities/user.entity';
export declare class UserRepository extends BaseRepository<UserDocument> {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByEmailWithPassword(email: string): Promise<User | null>;
    findAllUsers(page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
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
    findUserById(id: string): Promise<User | null>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null>;
    deleteUser(id: string): Promise<User | null>;
    searchUsers(query: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
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
}
