import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {UserModel, UserWithId} from "./schema/user.schema";
import {FilterQuery, Model, QueryFindOneAndUpdateOptions, QueryFindOptions, UpdateQuery} from "mongoose";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserModel>,
    ) {
    }
    async createUser(userDto: UserDto): Promise<UserWithId> {
        if (!userDto) {
            throw new HttpException("User data did not provide", HttpStatus.BAD_REQUEST);
        }
        const foundUser = await this.userModel.findOne({name: userDto.name});
        if (foundUser) {
            throw new HttpException("User with such name is created", HttpStatus.BAD_REQUEST);
        }
        const user = new this.userModel(userDto);
        const result = await user.save();
        return result;
    }
    async getUser(query: FilterQuery<UserModel>, options: QueryFindOptions = {}): Promise<UserWithId> {
        if (!query) {
            throw new HttpException("Query did not provide", HttpStatus.BAD_REQUEST);
        }
        const {projection, ...otherOption} = options;
        const foundUser = await this.userModel.findOne(query, projection, otherOption);
        if (!foundUser) {
            throw new HttpException("Invalid data provided", HttpStatus.BAD_REQUEST);
        }
        return foundUser
    }
    async updateUser(query: FilterQuery<UserModel>, updateData: UpdateQuery<UserModel>, options: QueryFindOneAndUpdateOptions = {}): Promise<UserWithId> {
        if (!query || !updateData) {
            throw new HttpException("Invalid data provided", HttpStatus.BAD_REQUEST);
        }
        const optionsForUpdate = {
            new: true,
            ...options
        }
        const updatedUser = await this.userModel.findOneAndUpdate(query, updateData, optionsForUpdate);
        if (!updatedUser) {
            throw new HttpException("User did not update", HttpStatus.BAD_REQUEST);
        }
        return updatedUser
    }
    async deleteUser(query: FilterQuery<UserModel>): Promise<string> {
        if (!query) {
            throw new HttpException("Query for delete did not provide", HttpStatus.BAD_REQUEST);
        }
        const deleteInfo = await this.userModel.deleteOne(query);
        let answer;
        deleteInfo.n ? answer = 'User is deleted' : answer = 'User is not deleted';
        return answer;
    }
}
