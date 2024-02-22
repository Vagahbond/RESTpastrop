export class HTTPError extends Error {
  public status;

  constructor(message: string) {
    super(message);
    this.status = 500;
  }
}

export class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}
