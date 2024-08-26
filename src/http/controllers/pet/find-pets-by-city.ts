import { makeFindByCityPetUseCase } from "@/use-cases/factories/make-pet-find-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findPetByCityBodySchema = z.object({
    city: z.string(),
    color: z.string().optional(),
    size: z.string().optional(),
    gender: z.string().optional(),
  });

  const { city, color, size, gender } = findPetByCityBodySchema.parse(
    request.query,
  );

  try {
    const findbyCityPetUseCase = makeFindByCityPetUseCase();

    const pets = await findbyCityPetUseCase.execute({
      city,
      color,
      size,
      gender,
    });
    return reply.status(200).send(pets);
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
