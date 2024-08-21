export class OrgAlreadyExistsError extends Error {
  constructor() {
    super("Esse email já existe.");
  }
}
