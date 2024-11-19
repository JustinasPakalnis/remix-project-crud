import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import prisma from "prisma/prismaClient";

export const action = async ({ params }: ActionFunctionArgs) => {
  await prisma.users.delete({
    where: { email: params.userDetails },
  });
  return redirect("/users");
};
