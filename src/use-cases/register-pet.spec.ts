import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { RegisterPetUseCase } from "./register-pet";
import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-org-repository";

let petRepository: InMemoryPetsRepository;
let orgRepository: InMemoryOrgsRepository;
let sut: RegisterPetUseCase;

describe("Register Pet Use Case", () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository();
    petRepository = new InMemoryPetsRepository();
    sut = new RegisterPetUseCase(petRepository);

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
  });

  it("Deve ser possivel registrar um pet", async () => {
    const { pet } = await sut.execute({
      name_pet: "FlokNelson",
      age: "7",
      city: "São Paulo",
      color: "Branco",
      size: "Pequeno",
      gender: "Macho",
      org_id: "org_01",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
