import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './infra/create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/')
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    return this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content: content,
        category: category,
        recipientId: recipientId,
      },
    });
  }
}
