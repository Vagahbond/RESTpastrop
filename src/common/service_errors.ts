export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message ?? "Something went wrong with the provided data.");
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message ?? "An error prevented you from authenticating.");
  }
}

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message ?? "You are not allowed to perform this action.");
  }
}
