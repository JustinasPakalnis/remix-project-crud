import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import prisma from "prisma/prismaClient";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const user = await prisma.users.findUnique({
    where: { email: params.userDetails },
  });
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return { user };
};

// export const action = async ({ params, request }: ActionFunctionArgs) => {
//   const formData = await request.formData();
//   const user = Object.fromEntries(formData);
//   await prisma.users.update({
//     where: { id: user.id},
//     data: { user },
//   });
//   return redirect(`/users/user/${params.userDetails}`);
// };

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = parseInt(formData.get("id") as string);

  const updates = {
    id: id,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    type: formData.get("type") as string,
    password: formData.get("password") as string,
    email: formData.get("email") as string,
    userstatus: formData.get("userstatus") as string,
  };

  await prisma.users.update({
    where: { id },
    data: updates,
  });

  return redirect(`/users/user/${params.userDetails}`);
};

export default function EditContact() {
  const { user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const searching = navigation.state !== "idle";

  return (
    <Form
      key={user.id}
      id="edit-form"
      method="post"
      className="bg-whiteshadow-md m-4 h-5/6 space-y-6 rounded-3xl border border-gray-200 p-6 dark:border-gray-700"
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Edit user details
      </h2>
      <input type="hidden" name="id" value={user.id} />
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <span className="mb-2 block font-medium text-gray-700">
            First Name
          </span>
          <input
            aria-label="First name"
            defaultValue={user.firstName}
            name="firstName"
            placeholder="First"
            type="text"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-1">
          <span className="mb-2 block font-medium text-gray-700">
            Last Name
          </span>
          <input
            aria-label="Last name"
            defaultValue={user.lastName}
            name="lastName"
            placeholder="Last"
            type="text"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <span className="mb-2 block font-medium text-gray-700">Type</span>
          <input
            aria-label="Type"
            defaultValue={user.type}
            name="type"
            placeholder="Type"
            type="text"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-1">
          <span className="mb-2 block font-medium text-gray-700">Password</span>
          <input
            aria-label="password"
            defaultValue={user.password}
            name="password"
            placeholder="Password"
            type="password"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <span className="mb-2 block font-medium text-gray-700">Email</span>
          <input
            aria-label="Email"
            defaultValue={user.email}
            name="email"
            placeholder="Email"
            type="email"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-1">
          <span className="mb-2 block font-medium text-gray-700">
            User Status
          </span>
          <input
            aria-label="userstatus"
            defaultValue={user.userstatus}
            name="userstatus"
            placeholder="User Status"
            type="text"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {!searching ? "Update" : "Updating..."}
        </button>
      </div>
    </Form>
  );
}
