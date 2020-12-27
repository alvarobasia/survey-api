import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adpter'

const SALT = 12

describe('Bcrypt adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(SALT)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_pass')
    expect(hashSpy).toHaveBeenCalledWith('any_pass', SALT)
  })
})
