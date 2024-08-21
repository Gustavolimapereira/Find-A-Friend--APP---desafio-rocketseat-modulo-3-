import { makeAuthenticateOrgUseCase } from "@/use-cases/factories/authenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateOrgUseCase();

    const { org } = await authenticateUseCase.execute({
      email,
      password,
    });
  } catch {
    return null;
  }
}
