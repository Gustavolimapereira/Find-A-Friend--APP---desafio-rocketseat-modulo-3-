import { Org, Prisma, Role } from "@prisma/client";
import { OrgRepository } from "../org-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgRepository {
  public items: Org[] = [];

  async findbyEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }
    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name_org: data.name_org,
      responsible_org: data.responsible_org,
      email: data.email,
      cep: data.cep,
      address: data.address,
      phone: data.phone,
      password_hash: data.password_hash,
      role: data.role ?? Role.MEMBER,
      created_at: new Date(),
    };

    this.items.push(org);

    return org;
  }
}
