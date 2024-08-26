import { randomUUID } from "crypto";
import { PetRepository } from "../pet-repository";
import { Pet, Prisma } from "@prisma/client";

export class InMemoryPetsRepository implements PetRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name_pet: data.name_pet,
      age: data.age,
      city: data.city,
      color: data.color,
      size: data.size,
      gender: data.gender,
      org_id: data.org_id,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async findByCity(city: string) {
    const pets = this.items.filter((item) => item.city === city);

    if (pets.length === 0) {
      return null;
    }

    return pets;
  }
}
