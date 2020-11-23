import {IsMongoId, IsOptional, IsString} from "class-validator";

export class UpdatePageDto {
    @IsString()
    @IsOptional()
    readonly title: string;
    @IsString()
    @IsOptional()
    readonly route: string;
}

export class ResponseUpdatePage extends UpdatePageDto{
    @IsMongoId()
    readonly _id: string;
}
