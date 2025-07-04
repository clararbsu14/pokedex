import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }
}
