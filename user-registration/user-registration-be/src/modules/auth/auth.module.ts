import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@app/libs/database/src/database.module';
import { AccountModelModule } from '@app/libs/database/src/models/account/account.module';

@Module({
  imports: [AccountModelModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
