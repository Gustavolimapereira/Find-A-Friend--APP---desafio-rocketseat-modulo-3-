import { makeFindByCityPetUseCase } from "@/use-cases/factories/make-pet-find-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findPetByCityBodySchema = z.object({
    city: z.string(),
  });

  const { city } = findPetByCityBodySchema.parse(request.query);

  console.log(city);

  try {
    const findbyCityPetUseCase = makeFindByCityPetUseCase();

    const pets = await findbyCityPetUseCase.execute({
      city,
    });
    return reply.status(200).send(pets);
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
