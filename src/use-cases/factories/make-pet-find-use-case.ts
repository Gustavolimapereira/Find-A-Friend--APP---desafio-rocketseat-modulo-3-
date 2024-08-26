import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { FindPetByCity } from "../find-by-city";

export function makeFindByCityPetUseCase() {
  const petRepository = new PrismaPetRepository();
  const findbyCityPetUseCase = new FindPetByCity(petRepository);

  return findbyCityPetUseCase;
}
