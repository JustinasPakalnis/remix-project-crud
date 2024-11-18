import { Link, useLoaderData } from "@remix-run/react";

import prisma from "prisma/prismaClient";
import { User } from "~/types";
export const loader = async () => {
  const users = await prisma.users.findMany();
  return { users };
};
export default function UserList() {
  const { users } = useLoaderData<{ users: User[] }>();

  return (
    <div className="flex h-screen m-4">
      <div className="flex flex-col items-center">
        <header className="flex flex-col items-center gap-9"></header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            Select user
          </p>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link
                  to={`/user/${user.email}`}
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                >
                  {user.firstName} {user.lastName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
