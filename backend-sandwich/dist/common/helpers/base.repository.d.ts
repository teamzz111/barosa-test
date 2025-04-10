import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
export declare abstract class BaseRepository<T extends Document> {
    protected readonly entityModel: Model<T>;
    constructor(entityModel: Model<T>);
    create(dto: unknown): Promise<T>;
    findOne(filterQuery: FilterQuery<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    find(filterQuery: FilterQuery<T>): Promise<T[]>;
    findAll(): Promise<T[]>;
    update(id: string, updateDto: UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    deleteMany(filterQuery: FilterQuery<T>): Promise<boolean>;
    count(filterQuery: FilterQuery<T>): Promise<number>;
}
