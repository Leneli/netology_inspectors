import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ErrorInterceptor } from './app.error.interceptor';
import { ValidationPipe } from './app.validation.pipe';
import { loginSchema } from './validation/schemas/login.schema';
import { ILoginDto } from './dto/login.dto';
import { JoiValidationPipe } from './validation/joi.validation.pipe';

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

  @Get('currency/:currency')
  getCurrency(@Param('currency', ValidationPipe) currency: string) {
    return currency;
  }

  @UsePipes(new JoiValidationPipe(loginSchema))
  @Post('/login')
  login(@Body() body: ILoginDto) {
    return body;
  }
}
