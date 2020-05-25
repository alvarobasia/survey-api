import { SignUpController } from './singup'

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
    expect(httpResponse.body).toEqual(new Error('Missing name'))
  })
})
