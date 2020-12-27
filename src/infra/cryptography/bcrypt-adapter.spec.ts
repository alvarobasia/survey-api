import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return Promise.resolve('hash')
  }
}))

const SALT = 12

const makeSut = (): BcryptAdapter => new BcryptAdapter(SALT)

describe('Bcrypt adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_pass')
    expect(hashSpy).toHaveBeenCalledWith('any_pass', SALT)
  })

  test('Should return hash', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_pass')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.encrypt('any_pass')
    await expect(promise).rejects.toThrow()
  })
})
