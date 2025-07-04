import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { TypeModule } from '../type/module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    TypeModule, // Ajout pour que Type soit injecté correctement
  ],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
