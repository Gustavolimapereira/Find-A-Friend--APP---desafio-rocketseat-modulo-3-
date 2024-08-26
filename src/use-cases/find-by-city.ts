import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";

interface FindByCityPetUseCaseRequest {
  city: string;
  color?: string;
  size?: string;
  gender?: string;
}

interface FindByCityPetUseCaseResponse {
  pets: Pet[];
}

export class FindPetByCity {
  constructor(private petRepository: PetRepository) {}

  async execute({
    city,
    color,
    size,
    gender,
  }: FindByCityPetUseCaseRequest): Promise<FindByCityPetUseCaseResponse> {
    const pets = await this.petRepository.findByCity({
      city,
      color,
      size,
      gender,
    });

    if (!pets) {
      throw new Error(
        "Nenhum pet disponivel para adoção na cidade especificada",
      );
    }

    return { pets };
  }
}
