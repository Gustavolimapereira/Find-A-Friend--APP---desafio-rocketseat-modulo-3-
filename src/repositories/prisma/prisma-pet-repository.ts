import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PetRepository } from "../pet-repository";

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });
    return pet;
  }

  async findByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: { city },
    });
    return pets;
  }
}
