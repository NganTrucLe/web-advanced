import { Account } from '@database/entities';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async registerUser(email: string, password: string) {
    try {
      await Account.save({ email, password });
      return { message: 'User registered successfully' };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error registering user');
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const user = await Account.findOne({ where: { email, password } });
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
