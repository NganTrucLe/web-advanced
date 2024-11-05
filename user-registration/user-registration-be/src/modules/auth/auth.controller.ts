import { Body, Controller, Post } from '@nestjs/common';
import { LogInDto, SignUpDto } from '../../libs/dtos';
import { AuthService } from './auth.service';

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
}
