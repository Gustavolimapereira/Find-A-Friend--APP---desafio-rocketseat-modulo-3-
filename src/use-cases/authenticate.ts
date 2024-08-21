import { OrgRepository } from "@/repositories/org-repository";
import { Org } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgRepository.findbyEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}
