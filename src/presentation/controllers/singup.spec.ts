import { SignUpController } from './singup'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { EmailValidator } from '../protocols/email-validator'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SingUp Controller', () => {
  test('Should return 400 if no name passed', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
  test('Should return 400 if no password passed', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'random',
        email: 'random@emal.com',
        passwordConfirmed: 'random'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 400 if no password confirmation passed', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'random',
        email: 'random@emal.com',
        password: 'random'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation')
    )
  })
  test('Should return 400 if invalid email is passed', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'random',
        email: 'invalid_email@emal.com',
        password: 'random',
        passwordConfirmation: 'random'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})
