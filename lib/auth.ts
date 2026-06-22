import { hash as argonHash, verify as argonVerify } from "argon2";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";
import prisma from "./prisma";

export const auth = betterAuth({
  plugins: [
    organization({
      requireEmailVerificationOnInvitation: true,
      organizationHooks: {},
    }),
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) =>
        await argonHash(password, {
          memoryCost: 19456,
          timeCost: 2,
          parallelism: 1,
          hashLength: 32,
        }),
      verify: async ({ hash, password }) => await argonVerify(hash, password),
    },
    // sendResetPassword: async ({user,url})=> await sendVerificationEmail({
    //   to:user.email,
    //   subject: "Verify your email",
    //   text: `Click the link to verify your email: ${url}`
    // }),
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
  },
  databaseHooks: {
    session: {
      create: {
        async before(session, context) {
          const firstOrganization = await prisma.organization.findFirst({
            where: { members: { some: { userId: session.userId } } },
          });
          return {
            data: { ...session, activeOrganizationId: firstOrganization?.id },
          };
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
export type SessionUser = typeof auth.$Infer.Session.session;
export type ActiveOrganization = typeof auth.$Infer.ActiveOrganization;
