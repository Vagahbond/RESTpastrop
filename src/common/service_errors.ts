export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message ?? "Something went wrong with the provided data.");
  }
}

export class authError extends Error {
  constructor(message: string) {
    super(message ?? "An error prevented you from authenticating.");
  }
}
