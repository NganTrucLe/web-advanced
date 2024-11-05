import { AccountModel } from '@app/libs/database/src/models';
import { Injectable, Logger } from '@nestjs/common';
import { SignUpDto } from '../../libs/dtos';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly accountModel: AccountModel) {}

  async registerUser(data: SignUpDto) {
    try {
      await this.accountModel.save(data);
      return { message: 'User registered successfully' };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error registering user');
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const user = await this.accountModel.findOne({ email, password });
      if (user) {
        return { message: 'User logged in successfully' };
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error logging in user');
    }
  }
}
