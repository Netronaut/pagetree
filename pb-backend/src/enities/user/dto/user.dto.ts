import {IsMongoId, IsString} from "class-validator";

export class UserDto {
    @IsString()
    readonly name: string;
}

export class ResponseUser extends UserDto{
    @IsMongoId()
    readonly _id: string;
}

export class ParamsId {
    @IsString()
    readonly id: string;
}

