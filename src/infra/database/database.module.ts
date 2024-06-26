import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/application/repositories/notification-repositories';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [PrismaService, { provide: NotificationsRepository, useClass: PrismaNotificationsRepository }],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
