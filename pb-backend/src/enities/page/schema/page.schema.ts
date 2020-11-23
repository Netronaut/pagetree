import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class Page {
    @Prop({required: true})
    readonly title: string;
    @Prop({required: true, unique: true})
    readonly route: string
}

export type PageModel = Page & Document;
export type PageWithId = Page & Pick<Document, '_id'>;

export const PageSchema = SchemaFactory.createForClass(Page);
