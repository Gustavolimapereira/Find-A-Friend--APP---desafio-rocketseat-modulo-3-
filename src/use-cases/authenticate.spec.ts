import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";

let orgRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate org Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgRepository);
  });

  it("Deve ser possivel se autenticar", async () => {
    orgRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgRepository);

    await orgRepository.create({
      name_org: "Infante Pets",
      responsible_org: "Carolina Fernanda Infante",
      email: "gu.lim@hotmail.com",
      cep: "12903-310",
      address: "Avenida Joanopolis",
      phone: "11-93349-7687",
      password_hash: await hash("123456", 6),
    });

    const { org } = await sut.execute({
      email: "gu.lim@hotmail.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });
});
