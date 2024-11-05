import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LogInDto, SignUpDto } from '../../libs/dtos';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../libs/guards/jwt-auth.guard';
import { CurrentUser } from '@app/libs/decorators';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async signUp(@Body() data: SignUpDto) {
    return this.authService.registerUser(data);
  }

  @Post('log-in')
  async logIn(@Body() data: LogInDto) {
    const { email, password } = data;
    return this.authService.loginUser(email, password);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getUser(
    @CurrentUser() user: { userId: string; email: string; username: string },
  ) {
    return this.authService.getUserInfo(user.userId);
  }
}
