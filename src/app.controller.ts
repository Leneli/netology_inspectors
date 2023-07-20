import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ErrorInterceptor } from './app.error.interceptor';

@UseInterceptors(ErrorInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const random = Math.random();

    if (random > 0.5) {
      throw new Error('something wrong');
    }
    // throw new Error('something wrong');
    return this.appService.getHello();
  }
}
