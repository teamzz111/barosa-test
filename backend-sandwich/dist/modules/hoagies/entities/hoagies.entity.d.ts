import { Document, Types } from 'mongoose';
export type HoagieDocument = Hoagie & Document;
export interface Ingredient {
    name: string;
    quantity: string;
}
export declare class Hoagie {
    name: string;
    ingredients: Ingredient[];
    pictureUrl: string;
    creator: Types.ObjectId;
    collaborators: Types.ObjectId[];
    commentCount: number;
}
export declare const HoagieSchema: import("mongoose").Schema<Hoagie, import("mongoose").Model<Hoagie, any, any, any, Document<unknown, any, Hoagie> & Hoagie & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Hoagie, Document<unknown, {}, import("mongoose").FlatRecord<Hoagie>> & import("mongoose").FlatRecord<Hoagie> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
