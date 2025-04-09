import { Document, Types } from 'mongoose';
export type CommentDocument = Comment & Document;
export declare class Comment {
    text: string;
    user: Types.ObjectId;
    hoagie: Types.ObjectId;
    timestamp: Date;
}
export declare const CommentSchema: import("mongoose").Schema<Comment, import("mongoose").Model<Comment, any, any, any, Document<unknown, any, Comment> & Comment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comment, Document<unknown, {}, import("mongoose").FlatRecord<Comment>> & import("mongoose").FlatRecord<Comment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
