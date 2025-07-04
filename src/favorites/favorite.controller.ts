// favorites/favorite.controller.ts
import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorites')
export class FavoriteController {
    constructor(private service: FavoriteService) { }

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Get('user/:userId')
    findByUser(@Param('userId') userId: number) {
        return this.service.findByUser(userId);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
