import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { RegisterPetUseCase } from "../register-pet";

export function makeRegisterPetUseCase() {
  const petRepository = new PrismaPetRepository();
  const registerPetUseCase = new RegisterPetUseCase(petRepository);

  return registerPetUseCase;
}
