import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FindAllParams, PetRepository } from "../pet-repository";

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });
    return pet;
  }

  async findByCity(params: FindAllParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city: params.city,
        color: params.color,
        size: params.size,
        gender: params.gender,
      },
    });
    return pets;
  }
}
