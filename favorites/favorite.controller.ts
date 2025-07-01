import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorites')
export class FavoriteController {
    constructor(private readonly service: FavoriteService) { }

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Get(':userId')
    findByUser(@Param('userId') userId: string) {
        return this.service.findByUser(+userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
