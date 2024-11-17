import { Link } from "@remix-run/react";
import { User } from "~/types"; // Make sure to import the type if necessary

export default function Index() {
  return (
    <div className="flex flex-col items-center gap-16 h-screen">
      <header className="flex flex-col items-center gap-9">
        <h1 className="text-2xl font-bold">Welcome to the User Dashboard</h1>
      </header>
      <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
        <p className="leading-6 text-gray-700 dark:text-gray-200">
          What&apos;s next?
        </p>
        <ul>
          <li>
            <Link
              to="/user-list"
              className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
            >
              Go to Users List
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
import { Link, useLoaderData } from "@remix-run/react";

import prisma from "prisma/prismaClient";
import { User } from "~/types";
export const loader = async () => {
  const users = await prisma.users.findMany();
  console.log(users);

  return { users };
};
export default function UserList() {
  const { users } = useLoaderData<{ users: User[] }>();

  if (!users || users.length === 0) {
    return <div>No users found.</div>; // Fallback message
  }
  return (
    <div className="flex h-screen ">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9"></header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            What&apos;s next?
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
// src/routes/user/$userDetails.tsx
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/prismaClient";

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
  const { user } = useLoaderData();
  return (
    <div>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>Email: {user.email}</p>
      {/* Render other user details */}
    </div>
  );
}
<nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
  <p className="leading-6 text-gray-700 dark:text-gray-200">
    What&apos;s next?
  </p>
  <ul>
    {users.map((user) => (
      <li key={user.id}>
        <Link
          to={`user/${user.email}`}
          className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
        >
          {user.firstName} {user.lastName}
        </Link>
      </li>
    ))}
  </ul>
</nav>;
