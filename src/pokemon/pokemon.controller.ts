import { Controller, Get, Param, Post, Body, Delete, Put, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    findAll(@Query('name') name: string, @Query('type') type: string) {
        return this.pokemonService.findAll(name, type);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.pokemonService.findOne(id);
    }

    @Post()
    create(@Body() data: any) {
        return this.pokemonService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: any) {
        return this.pokemonService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.pokemonService.remove(id);
    }
}
