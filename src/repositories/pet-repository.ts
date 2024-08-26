import { Pet, Prisma } from "@prisma/client";

export interface FindAllParams {
  city: string;
  color?: string;
  size?: string;
  gender?: string;
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findByCity(params: FindAllParams): Promise<Pet[] | null>;
}
