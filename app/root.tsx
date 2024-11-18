import {
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="flex">
          <Link
            to="/users"
            className="rounded-3xl h-10 m-4 flex justify-center content-center items-center bg-sky-500  border border-gray-200 p-3 w-60 text-center text-blue-700 hover:underline dark:border-gray-700 dark:text-blue-500"
          >
            Users
          </Link>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
