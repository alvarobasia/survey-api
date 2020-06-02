export class ServerError extends Error {
  constructor () {
    super('Internal sever error')
    this.name = 'ServerError'
  }
}
