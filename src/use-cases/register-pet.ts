import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name_pet: string;
  age: string;
  city: string;
  color: string;
  size: string;
  gender: string;
  org_id: string;
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    name_pet,
    age,
    city,
    color,
    size,
    gender,
    org_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.create({
      name_pet,
      age,
      city,
      color,
      size,
      gender,
      org_id,
    });

    return { pet };
  }
}
