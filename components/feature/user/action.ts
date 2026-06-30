"use server";

import prisma from "@/lib/prisma";
import { cache } from "react";

export const getUserByUserId = cache(async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      members: true,
    },
  });
});
