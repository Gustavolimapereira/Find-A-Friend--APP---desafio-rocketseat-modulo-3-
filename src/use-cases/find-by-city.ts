import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";

interface FindByCityPetUseCaseRequest {
  city: string;
}

interface FindByCityPetUseCaseResponse {
  pets: Pet[];
}

export class FindPetByCity {
  constructor(private petRepository: PetRepository) {}

  async execute({
    city,
  }: FindByCityPetUseCaseRequest): Promise<FindByCityPetUseCaseResponse> {
    const pets = await this.petRepository.findByCity(city);

    if (!pets) {
      throw new Error(
        "Nenhum pet disponivel para adoção na cidade especificada",
      );
    }

    return { pets };
  }
}
