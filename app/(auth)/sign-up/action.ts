"use server";

import prisma from "@/lib/prisma";
import { SignUpSchema } from "@/lib/validation";

export async function signUpUser({ email, name, password }: SignUpSchema) {
  return await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name,
      password,
    },
    update: { password, name, email },
  });
}

export async function getUsers() {
  return await prisma.user.findMany({ select: { name: true, email: true } });
}
