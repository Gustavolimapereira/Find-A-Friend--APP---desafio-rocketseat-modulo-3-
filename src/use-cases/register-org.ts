import { OrgRepository } from "@/repositories/org-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

interface RegisterOrgUseCaseRequest {
  name_org: string;
  responsible_org: string;
  email: string;
  cep: string;
  address: string;
  phone: string;
  password: string;
}

interface RegisterOrgUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name_org,
    responsible_org,
    email,
    cep,
    address,
    phone,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWichSameEmail = await this.orgRepository.findbyEmail(email);

    if (orgWichSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgRepository.create({
      name_org,
      responsible_org,
      email,
      cep,
      address,
      phone,
      password_hash,
    });

    return { org };
  }
}
