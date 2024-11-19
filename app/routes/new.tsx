import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useNavigate, useNavigation } from "@remix-run/react";
import prisma from "prisma/prismaClient";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const newUser = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    type: formData.get("type") as string,
    password: formData.get("password") as string,
    email: formData.get("email") as string,
    userstatus: formData.get("userstatus") as string,
  };

  await prisma.users.create({
    data: newUser,
  });

  return redirect(`/users/user/${newUser.email}`);
};

export default function EditContact() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const searching = navigation.state !== "idle";

  return (
    <Form
      id="edit-form"
      method="post"
      className="space-y-6 bg-whiteshadow-md h-5/6 m-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create new user</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <span className="block text-gray-700 font-medium mb-2">
            First Name
          </span>
          <input
            aria-label="First name"
            name="firstName"
            placeholder="First"
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-1">
          <span className="block text-gray-700 font-medium mb-2">
            Last Name
          </span>
          <input
            aria-label="Last name"
            name="lastName"
            placeholder="Last"
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <span className="block text-gray-700 font-medium mb-2">Type</span>
          <input
            aria-label="Type"
            name="type"
            placeholder="Type"
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-1">
          <span className="block text-gray-700 font-medium mb-2">Password</span>
          <input
            aria-label="password"
            name="password"
            placeholder="Password"
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <span className="block text-gray-700 font-medium mb-2">Email</span>
          <input
            aria-label="Email"
            name="email"
            placeholder="Email"
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-1">
          <span className="block text-gray-700 font-medium mb-2">
            User Status
          </span>
          <input
            aria-label="userstatus"
            name="userstatus"
            placeholder="User Status"
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {!searching ? "Create" : "Creating..."}
        </button>
      </div>
    </Form>
  );
}
