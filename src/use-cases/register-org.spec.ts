import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { RegisterOrgUseCase } from "./register-org";
import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

let orgRepository: InMemoryOrgsRepository;
let sut: RegisterOrgUseCase;

describe("Register Org Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    sut = new RegisterOrgUseCase(orgRepository);
  });

  it("Deve ser possivel registrar uma organização", async () => {
    const { org } = await sut.execute({
      name_org: "Infante Pets",
      responsible_org: "Carolina Fernanda Infante",
      email: "gu.lim@hotmail.com",
      cep: "12903-310",
      address: "Avenida Joanopolis",
      phone: "11-93349-7687",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("A senha da org deve ser hashed quando criada", async () => {
    const { org } = await sut.execute({
      name_org: "Infante Pets",
      responsible_org: "Carolina Fernanda Infante",
      email: "gu.lim@hotmail.com",
      cep: "12903-310",
      address: "Avenida Joanopolis",
      phone: "11-93349-7687",
      password: "123456",
    });

    const isPassWordCorrectyHashed = await compare("123456", org.password_hash);

    expect(isPassWordCorrectyHashed).toBe(true);
  });

  it("Não pode ser possivel criar email repetido", async () => {
    const email = "gu.lim@hotmail.com";

    await sut.execute({
      name_org: "Infante Pets",
      responsible_org: "Carolina Fernanda Infante",
      email,
      cep: "12903-310",
      address: "Avenida Joanopolis",
      phone: "11-93349-7687",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name_org: "Infante Pets",
        responsible_org: "Carolina Fernanda Infante",
        email,
        cep: "12903-310",
        address: "Avenida Joanopolis",
        phone: "11-93349-7687",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
