export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message ?? "Something went wrong with the provided data.");
  }
}
