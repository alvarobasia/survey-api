import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adpter'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return Promise.resolve('hash')
  }
}))

const SALT = 12

describe('Bcrypt adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(SALT)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_pass')
    expect(hashSpy).toHaveBeenCalledWith('any_pass', SALT)
  })
  test('Should return hash', async () => {
    const sut = new BcryptAdapter(SALT)
    const hash = await sut.encrypt('any_pass')
    expect(hash).toBe('hash')
  })
})
