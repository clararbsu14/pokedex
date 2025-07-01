import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly service: PokemonService) { }

    @Get()
    findAll(
        @Query('limit') limit = 10,
        @Query('offset') offset = 0,
        @Query('name') name?: string,
        @Query('type') type?: string
    ) {
        return this.service.findAll(+limit, +offset, name, type);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(+id);
    }

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.service.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
