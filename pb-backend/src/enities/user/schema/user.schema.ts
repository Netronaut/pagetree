import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class User {
    @Prop({required: true, unique: true})
    readonly name: string;
}

export type UserModel = Document & User;
export type UserWithId = User & Pick<Document, '_id'>;

export const UserSchema = SchemaFactory.createForClass(User);
