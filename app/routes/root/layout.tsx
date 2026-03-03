import { Outlet, redirect } from "react-router";
import { account, getExistingUser } from "~/lib/appwrite";
import { RootNavbar } from "~/components";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) return redirect("/sign-in");
    return await getExistingUser(user.$id);
  } catch (e) {
    console.error("Error fetching user", e);
    return redirect("/sign-in");
  }
}

const PageLayout = () => {
  return (
    <div className="bg-light-200">
      <RootNavbar />
      <Outlet />
    </div>
  );
};
export default PageLayout;
