import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from "bcrypt";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateUserDto) {
        const user = await this.prisma.user.findUnique({ //? Checks if the user is already in the DB.
            where: {
                email: dto.email
            },
        });

        if(user) throw new ConflictException('Email is already registered');

        const newUser = await this.prisma.user.create({ //? Creates a new user in the DB.
            data: {
                ...dto, //? Auto fills all the info inside the user dto.
                password: await hash(dto.password, 10), //? Hashes the password before saving it.
            },
        });

        const {password, ...result} = newUser //? Extracts the password and it doesn't return it.
        return result;
    };

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    };

    async findById(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    };
}
