import {
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import type { LinksFunction } from "@remix-run/node";
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];
export default function App() {
  const mode = null;
  return (
    <html lang="en" className={mode}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="flex">
          <div>
            <Link
              to="/users"
              className="m-4 flex h-10 w-60 content-center items-center justify-center rounded-lg border border-gray-200 bg-sky-500 p-3 text-center text-blue-700 hover:underline dark:border-gray-700 dark:bg-black dark:text-blue-500"
            >
              Users list
            </Link>
            <Link
              to="/new"
              className="m-4 flex h-10 w-60 content-center items-center justify-center rounded-lg border border-gray-200 bg-lime-500 p-3 text-center text-blue-700 hover:underline dark:border-gray-700 dark:text-blue-500"
            >
              New user
            </Link>
          </div>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
