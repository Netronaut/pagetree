import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {ParamsId, ResponseUser, UserDto} from "./dto/user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }
    @Post()
    async create(@Body() userDto: UserDto): Promise<ResponseUser>{
        return this.userService.createUser(userDto);
    }
    @Get('/:id')
    get(@Param() params: ParamsId): Promise<ResponseUser> {
        return this.userService.getUser({_id: params.id});
    }
    @Put('/:id')
    update(@Body() updateUserDto: UserDto, @Param() params: ParamsId): Promise<ResponseUser> {
        return this.userService.updateUser({_id: params.id}, updateUserDto);
    }
    @Delete('/:id')
    delete(@Param() params: ParamsId): Promise<string> {
        return this.userService.deleteUser({_id: params.id});
    }
}
