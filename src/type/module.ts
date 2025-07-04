import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './entity';

@Module({
    imports: [TypeOrmModule.forFeature([Type])],
    exports: [TypeOrmModule],
})
export class TypeModule { }
