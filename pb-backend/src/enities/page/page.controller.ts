import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PageService} from "./page.service";
import {CreatePageDto, ResponseCreatePage} from "./dto/create-page.dto";
import {ResponseUpdatePage, UpdatePageDto} from "./dto/update-page.dto";

@Controller('page')
export class PageController {
    constructor(
        private readonly pageService: PageService
    ) {
    }
    @Post()
    createPage(@Body() createPageDto: CreatePageDto): Promise<ResponseCreatePage> {
        return this.pageService.createPage(createPageDto);
    }
    @Get('/all')
    getPages(): Promise<ResponseCreatePage[]> {
        return this.pageService.getPages({});
    }
    @Get('/:id')
    getPage(@Param() params): Promise<ResponseCreatePage> {
        return this.pageService.getPage({_id: params.id})
    }
    @Put('/:id')
    updatePage(@Body() updatePageDto: UpdatePageDto, @Param() params): Promise<ResponseUpdatePage> {
        return this.pageService.updatePage({_id: params.id}, updatePageDto);
    }
    @Delete('/:id')
    deletePage(@Param() params): Promise<ResponseCreatePage> {
        return this.pageService.deletePage({_id: params.id});
    }
}
