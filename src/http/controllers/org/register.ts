import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeRegisterOrgUseCase } from "@/use-cases/factories/make-org-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name_org: z.string(),
    responsible_org: z.string(),
    email: z.string().email(),
    cep: z.string(),
    address: z.string(),
    phone: z.string(),
    password: z.string().min(6),
  });

  const { name_org, responsible_org, email, cep, address, phone, password } =
    registerBodySchema.parse(request.body);

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase();

    await registerOrgUseCase.execute({
      name_org,
      responsible_org,
      email,
      cep,
      address,
      phone,
      password,
    });
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
