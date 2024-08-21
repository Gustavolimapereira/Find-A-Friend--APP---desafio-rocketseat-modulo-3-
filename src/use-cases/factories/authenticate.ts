import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateOrgUseCase() {
  const authenticateOrgRepository = new PrismaOrgRepository();
  const authenticateOrgUseCase = new AuthenticateUseCase(
    authenticateOrgRepository,
  );

  return authenticateOrgUseCase;
}
