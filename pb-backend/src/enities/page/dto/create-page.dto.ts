import {IsMongoId, IsString} from "class-validator";

export class CreatePageDto {
    @IsString()
    readonly title: string;
    @IsString()
    readonly route: string;
}

export class ResponseCreatePage extends CreatePageDto {
    @IsMongoId()
    readonly _id: string;
}
