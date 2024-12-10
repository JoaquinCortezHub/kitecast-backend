import { Injectable, OnModuleInit } from '@nestjs/common'; //? Extract this from Nest.js docs (Prisma integration)
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
};
