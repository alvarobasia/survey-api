import { SignUpController } from './singup'
import { MissingParamError } from '../errors/missing-param-error'

describe('SingUp Controller', () => {
  test('Should return 400 if no name passed', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'random@emal.com',
        password: 'random',
        passwordConfirmed: 'random'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Should return 400 if no email passed', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'random',
        password: 'random',
        passwordConfirmed: 'random'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
