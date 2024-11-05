import { BaseModel } from '../base-model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from '@database/schemas/account.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccountModel extends BaseModel<Account> {
  constructor(@InjectModel(Account.name) model: Model<Account>) {
    super(model);
  }
}