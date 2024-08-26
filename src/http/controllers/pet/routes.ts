import { FastifyInstance } from "fastify";
import { registerPet } from "./register";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { findPetByCity } from "./find-pets-by-city";

export async function petRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/pets/:orgId", registerPet);
  app.get("/petsbycity", findPetByCity);
}
