import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { OrgRepository } from "../org-repository";

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });
    return org;
  }

  async findbyEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });
    return org;
  }
}
