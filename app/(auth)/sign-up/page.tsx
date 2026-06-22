import { Metadata } from "next";
import { Suspense } from "react";
import { getUsers } from "./action";
import SignUpForm from "./form-sign-up";

export const metadata: Metadata = {
  title: "Self Registration",
};
export default function Page() {
  const _users = getUsers();
  return (
    <main className="flex  justify-center items-center flex-col px-4 min-h-svh">
      <Suspense fallback={"...Loading"}>
        {_users.then((users) => (
          <div className="gap-2 grid grid-cols-2 max-w-sm">
            {users.map((user) => (
              <div key={user.email} className="bg-secondary p-2">
                <div>{user.name}</div>
                <div>{user.email}</div>
              </div>
            ))}
          </div>
        ))}
      </Suspense>
      <SignUpForm />
    </main>
  );
}
