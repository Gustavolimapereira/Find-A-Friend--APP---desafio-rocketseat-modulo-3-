import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindPetByCity } from "./find-by-city";

let petRepository: InMemoryPetsRepository;
let orgRepository: InMemoryOrgsRepository;
let sut: FindPetByCity;

describe("Find pet by city", () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository();
    petRepository = new InMemoryPetsRepository();

    sut = new FindPetByCity(petRepository);

    await orgRepository.create({
      id: "org_01",
      name_org: "Infante Pets",
      responsible_org: "Carolina Fernanda Infante",
      email: "gu.lim@hotmail.com",
      cep: "12903-310",
      address: "Avenida Joanopolis",
      phone: "11-93349-7687",
      password_hash: "123456",
      role: "MEMBER",
    });

    await petRepository.create({
      name_pet: "FlokNelson",
      age: "7",
      city: "São Paulo",
      color: "Branco",
      size: "Pequeno",
      gender: "Macho",
      org_id: "org_01",
    });

    await petRepository.create({
      name_pet: "Cinzinha",
      age: "2",
      city: "Rio de Janeiro",
      color: "cinza",
      size: "Pequeno",
      gender: "Macho",
      org_id: "org_01",
    });

    await petRepository.create({
      name_pet: "Branquinho",
      age: "3",
      city: "Rio de Janeiro",
      color: "branco",
      size: "Pequeno",
      gender: "Macho",
      org_id: "org_01",
    });
  });

  it("Deve ser possivel retornar todos os pets de uma determinada cidade", async () => {
    const { pets } = await sut.execute({
      city: "Rio de Janeiro",
    });

    expect(pets.length).toBe(2);
  });
});
