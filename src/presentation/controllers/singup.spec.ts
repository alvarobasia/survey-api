import { SignUpController } from './singup'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { EmailValidator } from '../protocols'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
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
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'random',
        email: 'any_email@emal.com',
        password: 'random',
        passwordConfirmation: 'random'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@emal.com')
  })
  test('Should return 500 if EmailValidator throw', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'random',
        email: 'random@emal.com',
        password: 'random',
        passwordConfirmation: 'random'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(
      new ServerError()
    )
  })
})
