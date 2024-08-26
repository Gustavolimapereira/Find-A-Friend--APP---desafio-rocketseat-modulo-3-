import { makeRegisterPetUseCase } from "@/use-cases/factories/make-pet-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetParamsSchema = z.object({
    orgId: z.string().uuid(),
  });

  const { orgId } = registerPetParamsSchema.parse(request.params);

  console.log(orgId);

  const registerPetBodySchema = z.object({
    name_pet: z.string(),
    age: z.string(),
    city: z.string(),
    color: z.string(),
    size: z.string(),
    gender: z.string(),
  });

  const { name_pet, age, city, color, size, gender } =
    registerPetBodySchema.parse(request.body);

  try {
    const registerPetUseCase = makeRegisterPetUseCase();

    await registerPetUseCase.execute({
      name_pet,
      age,
      city,
      color,
      size,
      gender,
      org_id: orgId,
    });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
