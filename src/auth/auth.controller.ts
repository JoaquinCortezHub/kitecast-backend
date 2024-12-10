import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,
        private authService: AuthService
    ) {}

    @Post('sign-up')
    async registerUser(@Body() dto: CreateUserDto) {
        return this.userService.create(dto)
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
