import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model, QueryFindOptions, UpdateQuery} from "mongoose";
import {PageModel, PageWithId} from "./schema/page.schema";
import {CreatePageDto} from "./dto/create-page.dto";

@Injectable()
export class PageService {
    constructor(
        @InjectModel('Page') private readonly pageModel: Model<PageModel>
    ) {
    }
    async createPage(pageDto: CreatePageDto): Promise<PageWithId> {
        if(!pageDto) {
            throw new HttpException("Page data did not provide", HttpStatus.BAD_REQUEST);
        }
        const foundPage = await this.pageModel.findOne({route: pageDto.route});
        if (foundPage) {
            throw new HttpException("Page with such title is created", HttpStatus.BAD_REQUEST);
        }
        const page = new this.pageModel(pageDto);
        await page.save()
        return page;
    }
    async getPages(query: FilterQuery<PageModel>, options: QueryFindOptions = {}): Promise<PageWithId[]> {
        if(!query) {
            throw new HttpException("Query did not provide", HttpStatus.BAD_REQUEST);
        }
        const {projection, ...otherOptions} = options;
        const foundPages = await this.pageModel.find(query, projection, otherOptions);
        if(!foundPages) {
            throw new HttpException("Invalid data provided", HttpStatus.BAD_REQUEST);
        }
        return foundPages;
    }
    async getPage(query: FilterQuery<PageModel>, options: QueryFindOptions = {}): Promise<PageWithId> {
        if(!query) {
            throw new HttpException("Query did not provide", HttpStatus.BAD_REQUEST);
        }
        const {projection, ...otherOptions} = options;
        const foundPage = await this.pageModel.findOne(query, projection, otherOptions);
        if(!foundPage) {
            throw new HttpException("Invalid data provided", HttpStatus.BAD_REQUEST);
        }
        return foundPage;
    }
    async updatePage(query: FilterQuery<PageModel>, updateData: UpdateQuery<PageModel>, options: QueryFindOptions = {}): Promise<PageWithId> {
        if (!query || !updateData) {
            throw new HttpException("Invalid data provided", HttpStatus.BAD_REQUEST);
        }
        const optionsForFind = {
            new: true,
            ...options
        }
        const updatedPage = await this.pageModel.findOneAndUpdate(query, updateData, optionsForFind);
        if (!updatedPage) {
            throw new HttpException("Invalid data provided", HttpStatus.BAD_REQUEST);
        }
        return updatedPage;
    }
    async deletePage(query: FilterQuery<PageModel>): Promise<PageWithId> {
        if (!query) {
            throw new HttpException("Query for delete did not provide", HttpStatus.BAD_REQUEST);
        }
        const page = await this.pageModel.findOneAndDelete(query);
        if (!page) {
            throw new HttpException("Page did not delete", HttpStatus.BAD_REQUEST);
        }
        return page;
    }
}
