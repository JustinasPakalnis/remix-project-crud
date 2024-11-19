import { Form, useLoaderData } from "@remix-run/react";
import prisma from "prisma/prismaClient";
import { User } from "~/types";
export const loader = async ({
  params,
}: {
  params: { userDetails: string };
}) => {
  const user = await prisma.users.findUnique({
    where: { email: params.userDetails },
  });

  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  return { user };
};

export default function UserDetails() {
  const { user } = useLoaderData<{ user: User }>();

  return (
    <div className="flex justify-center items-start m-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-gray-500">Email: {user.email}</p>
        <p className="text-gray-500">Position: {user.position}</p>
        <p className="text-gray-500">Status: {user.userstatus}</p>
        <div className="flex gap-2 justify-between">
          <Form action="destroy" method="post">
            <button
              className="bg-rose-700 rounded-md py-2 px-6 my-4"
              type="submit"
            >
              Delete
            </button>
          </Form>
          <Form action="edit">
            <button
              className="bg-lime-700 rounded-md py-2 px-6 my-4"
              type="submit"
            >
              Update
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
