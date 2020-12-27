import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
  AddAccountRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(
      Object.assign({ ...accountData }, { password: hashPassword })
    )
    return Promise.resolve(null)
  }
}
